import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { MemberService } from '../members/member.service';
import { Member } from '../../entity/member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), AuthModule],
  controllers: [LoginController],
  providers: [LoginService, AuthService, MemberService],
})
export class LoginModule {}
