import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { Member } from '../../entity/member.entity';
import {
  CreateMemberDto,
  MemberDataDto,
  MemberDto,
  UpdateMemberDto,
  UpdateMemberRoleDto,
} from './dto/member.dto';
import * as CryptoJS from 'crypto-js';
import { PageDto, PageQueryDto } from '../../dtos/page.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async getMembers(query: PageQueryDto): Promise<{
    members: MemberDataDto[];
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
      return {
        members: members.map((i) => {
          return {
            ...i,
            role: i.role
              .split(',')
              .map((i) => {
                return Number(i);
              })
              .sort((a, b) => a - b),
          };
        }),
        page: pagination,
      };
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
              HttpStatus.NOT_ACCEPTABLE,
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
            throw new HttpException(
              error.sqlMessage,
              HttpStatus.NOT_ACCEPTABLE,
            );
        }
      } else if (error) {
        throw new HttpException(
          '註冊失敗：權限設定有誤，請檢查後重新註冊！',
          HttpStatus.NOT_ACCEPTABLE,
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
        throw new HttpException('很抱歉，找不到該用戶！', HttpStatus.NOT_FOUND);
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
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async updateMemberRole(
    id: string,
    updateData: UpdateMemberRoleDto,
  ): Promise<MemberDataDto> {
    try {
      // 根據 id 查找要更新的 member
      const member = await this.findMember(id);
      if (!member) {
        throw new HttpException('找不到該用戶！', HttpStatus.NOT_FOUND);
      }
      updateData.role.forEach((i) => {
        if (isNaN(Number(i))) {
          throw new HttpException(
            '註冊失敗：權限設定有誤，請檢查後重新註冊！',
            HttpStatus.NOT_ACCEPTABLE,
          );
        }
      });

      // 更新 member 的屬性
      member.role = updateData.role
        .map((i) => {
          return Number(i);
        })
        .sort((a, b) => a - b);
      // ...

      // 執行保存或更新操作，例如：
      await this.memberRepository.save({
        ...member,
        role: member.role.join(','),
      });

      delete member.password;

      return member;
    } catch (err) {
      throw new HttpException(
        '編輯失敗，請確認後再次編輯！',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateMember(
    id: string,
    updateData: UpdateMemberDto,
  ): Promise<MemberDataDto> {
    try {
      // 根據 id 查找要更新的 member
      const member = await this.findMember(id);
      if (!member) {
        throw new HttpException('找不到該用戶！', HttpStatus.NOT_FOUND);
      }
      // 更新 member 的屬性
      const secretKey = 'mollymoooo';
      const decrypted = updateData.password
        ? CryptoJS.AES.decrypt(updateData.password, secretKey)
        : '';
      const decryptedText = decrypted?.toString(CryptoJS.enc.Utf8);

      const update = {
        username: updateData.username ?? member.username,
        password: updateData.password
          ? decryptedText
            ? decryptedText
            : updateData.password
          : member.password,
      };

      await this.memberRepository.save({
        ...member,
        ...update,
        role: member.role.join(','),
      });

      delete member.password;
      if (update.password) {
        delete update.password;
      }
      return {
        ...member,
        ...update,
      };
    } catch (err) {
      throw new HttpException(
        '編輯失敗，請確認後再次編輯！',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getMemberWithLogs(id: number | string): Promise<Member> {
    let Member: Member;
    try {
      Member =
        (await this.memberRepository.findOne({
          where: { id: id as number },
          relations: ['logs'],
        })) ??
        (await this.memberRepository.findOne({
          where: { account: id as string },
          relations: ['logs'],
        }));
      if (!Member) {
        throw new HttpException('找不到該用戶！', HttpStatus.BAD_REQUEST);
      }
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return Member;
  }
}
