import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { };

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization'];
        if (!token || !token.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing or invalid token');
        }

        const jwtToken = token.split(' ')[1];
        try {
            const decoded = this.jwtService.verify(jwtToken, { secret: process.env.JWT_SECRET });
            request.user = decoded;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}