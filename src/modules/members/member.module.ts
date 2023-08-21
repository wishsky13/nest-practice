import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { Member } from '../../entity/member.entity';
import { Log } from '../../entity/log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Log])],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
