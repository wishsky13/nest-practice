/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MemberService } from './member.service';
import {
  CreateMemberDto,
  MemberDataDto,
  UpdateMemberDto,
  UpdateMemberRoleDto,
} from './dto/member.dto';
import { PageDto, PageQueryDto } from '../../dtos/page.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/auth.decorator';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllMembers(@Query() query: PageQueryDto): Promise<{
    members: MemberDataDto[];
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
  async getProfile(@Request() req) {
    const { iat, exp, ...userData } = req.member;
    return userData;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async get(@Param('id') id: number | string) {
    return this.memberService.findMember(id);
  }

  @UseGuards(AuthGuard)
  @Roles(1)
  @Put('/:id/role')
  async updateMemberRole(
    @Param('id') id: string,
    @Body() update: UpdateMemberRoleDto,
  ) {
    return this.memberService.updateMemberRole(id, update);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(AuthInterceptor)
  async updateMember(@Param('id') id: string, @Body() update: UpdateMemberDto) {
    return this.memberService.updateMember(id, update);
  }
}
