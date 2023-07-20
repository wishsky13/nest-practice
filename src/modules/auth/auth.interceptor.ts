import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private jwtService: JwtService) {}
  intercept(context: ExecutionContext, next: any): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Missing token');
    }

    // 執行驗證邏輯，例如解析、驗證 Token
    const decoded = this.jwtService.verify(token);
    // 取得當前要操作的使用者 ID
    const { id } = request.params;

    // 驗證 Token 是否屬於當前要操作的使用者
    if (decoded.id !== id && decoded.account !== id) {
      throw new UnauthorizedException('Invalid token');
    }

    return next.handle();
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
