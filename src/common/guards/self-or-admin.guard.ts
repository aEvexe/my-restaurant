import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class SelfOrAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const paramId = +(request.params.id || request.params.userId);

    if (!user) throw new ForbiddenException('User not authenticated');

    const isAdmin = user.roles?.includes('admin');
    const isSelf = user.id === paramId;

    if (isAdmin || isSelf) return true;

    throw new ForbiddenException('Access denied');
  }
}
