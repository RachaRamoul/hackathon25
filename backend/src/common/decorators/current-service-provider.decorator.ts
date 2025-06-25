import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentServiceProvider = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.serviceProvider;
  },
);
