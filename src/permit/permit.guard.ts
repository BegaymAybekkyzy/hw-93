import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../roles.decorator';
import { RequestWithUser } from '../types';

@Injectable()
export class PermitGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }
    const request: RequestWithUser = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new ForbiddenException('Not authenticated');
    }

    if (!requiredRoles.includes(request.user.role)) {
      throw new ForbiddenException('Not authorized');
    }

    return true;
  }
}
