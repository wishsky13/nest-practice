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
import * as CryptoJS from 'crypto-js';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async getMembers(): Promise<Member[]> {
    const members = await this.memberRepository.find();
    members.forEach((member) => {
      delete member.password;
    });
    return members;
  }

  async createMember(
    member: Member,
  ): Promise<{ id: number; account: string; role: number[] }> {
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
        member.role = '2';
      }
      await this.memberRepository.save(member);
      return {
        id: member.id,
        account: member.account,
        role: member.role
          .split(',')
          .map((i) => {
            return Number(i);
          })
          .sort((a, b) => a - b),
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

  async findMember(id: number | string): Promise<Member | undefined> {
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
    return Member;
  }
}
