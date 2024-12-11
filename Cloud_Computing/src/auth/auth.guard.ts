import { CanActivate, ExecutionContext, ForbiddenException, Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { Role } from '@prisma/client';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService : AuthService,
    private readonly reflector: Reflector, // Optional: For roles or metadata
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const refreshTokenHeader = request.headers['x-refresh-token'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1]; // Extract the Bearer token
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const payload = this.jwtService.verify(token, { secret: process.env.SECRET_KEY }); // Replace with an env variable

      const user = await this.authService.validateUser(payload.uuid); // Validate the user

      request.user = user; // Attach the decoded token payload to the request object

      if (!roles || roles.length === 0) {
        return true;
      }

      // Check if the user's roles match any of the required roles
      const hasRole = roles.includes(user.role);
      if (!hasRole) {
        throw new ForbiddenException('You do not have permission to access this resource');
      }

      return true;
    } catch (error) {
      if (error.name === 'TokenExpiredError' && refreshTokenHeader) {
        try {
          const newAccessToken = await this.authService.generateNewAccessToken(refreshTokenHeader);
          request.headers['authorization'] = `Bearer ${newAccessToken.access_token}`;
          return true;
        } catch (refreshError) {
          throw new UnauthorizedException('Invalid refresh token');
        }
      }
      throw new UnauthorizedException('Invalid token');
    }
  }
}