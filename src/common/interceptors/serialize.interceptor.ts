import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";
import { SERIALIZE_KEY } from "../decorators/serialize.decorator";

@Injectable()
export class SerializeInterceptor implements NestInterceptor{
  constructor (private readonly reflector: Reflector){}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any>{
    const dto = this.reflector.getAllAndOverride<ClassConstructor<object>>(SERIALIZE_KEY,
    [context.getHandler(), context.getClass()]
    );

    return next.handle().pipe(
      map((data: unknown) => {
        if(!dto){
          return data;
        }
        return plainToInstance(dto, data, {
          excludeExtraneousValues: true,
        }
        )
      })
    )
  }
}