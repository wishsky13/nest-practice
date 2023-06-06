import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './modules/members/member.module';
import { DatabaseModule } from './database.module';
import { AuthModule } from './modules/auth/auth.module';
// import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from './modules/auth/auth.guard';
import { LoginModule } from './modules/login/login.module';

// @Global() // 全域模組
@Module({
  imports: [DatabaseModule, MemberModule, AuthModule, LoginModule],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule {}
