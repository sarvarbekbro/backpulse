import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/modules/users/entities/user.entity";

export const CurrentUser = createParamDecorator(
  (data: keyof User, context: ExecutionContext)=> {
    const request = context.switchToHttp().getRequest();
    return request.user
  }
)