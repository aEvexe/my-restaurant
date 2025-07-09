import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';

export const CookieGetter = createParamDecorator(
  (data: string, contex: ExecutionContext): string => {
    const request = contex.switchToHttp().getRequest();
    const refreshToken = request.cookies?.[data];

    if (!refreshToken) {
      throw new UnauthorizedException("Token is not found");
    }

    return refreshToken;
  },
);

// decorators/roles.decorator.ts

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

