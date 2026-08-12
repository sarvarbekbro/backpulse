import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { RequestLoggingInterceptor } from './interceptors/request-logging/request-logging.interceptor';
import { LogsService } from './logs.service';
import type { RequestLogData } from './interfaces/request-log-data.interface';
import { Project } from '../projects/entities/project.entity';

@Controller('logs')
export class LogsController {
  constructor( private readonly logsService: LogsService){}

  @Get()
  findAll(project: Project){
    
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe)id: number, project: Project ){

  }
}
