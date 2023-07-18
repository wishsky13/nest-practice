/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/member.dto';
import { PageDto, PageQueryDto } from '../../dtos/page.dto';
import { Member } from '../../entity/member.entity';
import { AuthGuard } from '../auth/auth.guard';
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllMembers(@Query() query: PageQueryDto): Promise<{
    members: Member[];
    page: PageDto;
  }> {
    return this.memberService.getMembers(query);
  }

  @Post()
  async createMember(
    @Body() member: CreateMemberDto,
  ): Promise<{ id: number; account: string }> {
    return this.memberService.createMember(member);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    const { iat, exp, ...userData } = req.member;
    return userData;
  }

  // @Get(':id')
  // get(@Param('id') id: number | string) {
  //   return this.memberService.findMember(id);
  // }
}
