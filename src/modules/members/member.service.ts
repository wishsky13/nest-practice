import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../../entity/member.entity';
import { CreateMemberDto, MemberDataDto, MemberDto } from './dto/member.dto';
import * as CryptoJS from 'crypto-js';
import { PageDto, PageQueryDto } from '../../dtos/page.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async getMembers(query: PageQueryDto): Promise<{
    members: Member[];
    page: PageDto;
  }> {
    try {
      const current = query.current ? Number(query.current) : 1;
      const size = query.size ? Number(query.size) : 15;

      const [members, total] = await this.memberRepository.findAndCount({
        skip: (current - 1) * size, // 跳過的數量，根據當前頁數和每頁筆數計算
        take: size, // 每頁筆數
      });
      // const members = await this.memberRepository.find();
      members.forEach((member) => {
        delete member.password;
      });

      const totalPages = Math.ceil(total / size); // 總頁數

      const pagination: PageDto = {
        current: current, // 當前頁數
        count: totalPages, // 總頁數
        size: size, // 每頁筆數
        last: total, // 總數據筆數
      };
      return { members: members, page: pagination };
    } catch (err) {
      throw new HttpException(
        '取得失敗，請確認要求條件後再次申請！',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createMember(member: CreateMemberDto): Promise<MemberDataDto> {
    try {
      const secretKey = 'mollymoooo';
      const decrypted = CryptoJS.AES.decrypt(member.password, secretKey);
      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
      if (decryptedText) {
        member.password = decryptedText;
      }
      //check role
      if (member?.role) {
        member.role.split(',').forEach((i) => {
          if (isNaN(Number(i))) {
            throw new HttpException(
              '註冊失敗：權限設定有誤，請檢查後重新註冊！',
              HttpStatus.FORBIDDEN,
            );
          }
        });
      } else {
        member.role = '3';
      }
      const memberData = await this.memberRepository.save(member);
      return {
        id: memberData.id,
        account: memberData.account,
        username: memberData.username,
        role: memberData.role
          .split(',')
          .map((i) => {
            return Number(i);
          })
          .sort((a, b) => a - b),
        created_at: memberData.created_at,
      };
    } catch (error) {
      if (error?.code) {
        switch (error.code) {
          case 'ER_DUP_ENTRY':
            throw new ConflictException(
              '註冊失敗：該帳號已經有人使用，請更換新的帳號名稱！',
            );
          default:
            throw new HttpException(error.sqlMessage, HttpStatus.FORBIDDEN);
        }
      } else if (error) {
        throw new HttpException(
          '註冊失敗：權限設定有誤，請檢查後重新註冊！',
          HttpStatus.FORBIDDEN,
        );
      } else {
        throw new InternalServerErrorException('註冊失敗！');
      }
    }
  }

  async findMember(id: number | string): Promise<MemberDto | undefined> {
    let Member: Member;
    try {
      Member =
        (await this.memberRepository.findOneBy({ id: id as number })) ??
        (await this.memberRepository.findOneBy({ account: id as string }));
      if (!Member) {
        throw new HttpException('找不到該用戶！', HttpStatus.BAD_REQUEST);
      }
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return {
      ...Member,
      role: Member.role
        .split(',')
        .map((i) => {
          return Number(i);
        })
        .sort((a, b) => a - b),
    };
  }
}
