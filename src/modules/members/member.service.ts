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

  async createMember(member: Member): Promise<Member> {
    try {
      return await this.memberRepository.save(member);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(
          '註冊失敗：該帳號已經有人使用，請更換新的帳號名稱！',
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
