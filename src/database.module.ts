import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      pluginName: 'mysql_native_password',
      type: 'mysql',
      host: 'localhost', // 資料庫主機位址
      port: 3306, // 資料庫連接埠
      username: 'root', // 資料庫使用者名稱
      password: 'mollymoooo', // 資料庫使用者密碼
      database: 'demo', // 資料庫名稱
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 實體模型路徑
      synchronize: true, // 自動同步資料庫結構，僅開發環境中使用
    } as ConnectionOptions),
  ],
})
export class DatabaseModule {}
