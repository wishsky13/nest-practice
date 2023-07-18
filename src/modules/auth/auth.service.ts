import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MemberService } from '../members/member.service';
import { JwtService } from '@nestjs/jwt';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class AuthService {
  constructor(
    private memberService: MemberService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    account: string,
    pass: string,
  ): Promise<{
    access_token: string;
    username: string;
    account: string;
    role: number[];
    created_at: Date;
  }> {
    const user = await this.memberService.findMember(account);
    const secretKey = 'mollymoooo';
    const decrypted = CryptoJS.AES.decrypt(pass, secretKey);
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    const password = !decryptedText ? pass : decryptedText;
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    // const { password, ...result } = user;
    // * Generate a JWT and return it here
    const payload = {
      account: user.account,
      username: user.username,
      role: user.role
        .map((i) => {
          return Number(i);
        })
        .sort((a, b) => a - b),
      created_at: user.created_at,
    };
    // instead of the user object
    return {
      access_token: await this.jwtService.signAsync(payload),
      ...payload,
    };
  }
}
