import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { RequestLogData } from '../../interfaces/request-log-data.interface';
import { LogsService } from '../../logs.service';


@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
   constructor(private readonly logsService: LogsService){}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse()
    const startTime = Date.now();
    return next.handle().pipe(
      tap( () => {

        const responseTime = Date.now() - startTime;
       const data: RequestLogData ={
        method: request.method,
        project: request.project,
        path: request.url,
        statusCode: response.statusCode,
        responseTime,
        ip: request.ip,
        userAgent: request.headers['user-agent']
       };
 void this.logsService.create(data)
      })
    );
  }
}
