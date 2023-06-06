import {
  Controller,
  Get,
  Render,
  Post,
  Body,
  Redirect,
  Param,
  Res,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { MemberService } from '../members/member.service';
import { Response } from 'express';

@Controller('')
export class LoginController {
  constructor(private authService: AuthService) {}

  @Get('/login')
  @Render('login') // 使用 login 模板渲染頁面
  getLoginPage() {
    return { title: '登入' };
  }

  @Get('/dashboard')
  @Render('dashboard') // 使用 login 模板渲染頁面
  getDashboardPage(
    @Param('token') token: string,
    @Param('username') username: string,
  ) {
    return { username: username };
  }

  @Get('/signup')
  @Render('signup') // 使用 login 模板渲染頁面
  getSignupPage() {
    return {};
  }

  @Get('/logout')
  @Render('logout') // 使用 login 模板渲染頁面
  getLogoutPage() {
    return {};
  }
}
