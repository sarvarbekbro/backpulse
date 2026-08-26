import {  Controller, Get, Param, ParseIntPipe, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { LogsService } from './logs.service';
import { ProjectsService } from '../projects/projects.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { ApiKeyGuard } from '../api-keys/guards/api-key.guard';
import { RequestLoggingInterceptor } from './interceptors/request-logging/request-logging.interceptor';

@Controller('projects/:projectId/logs')
export class LogsController {
  constructor( private readonly logsService: LogsService,
    private readonly projectService: ProjectsService
  ){}

  @Get()
  @UseGuards(JwtAuthGuard)
 async  findAll(@Param('projectId', ParseIntPipe)projectId: number, @CurrentUser() user: User){
  const project =  await this.projectService.findOne(projectId, user)

  return this.logsService.findAll(project)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('projectId', ParseIntPipe) projectId: number,@Param('id', ParseIntPipe)id: number, @CurrentUser() user:  User  ){
 const project = await this.projectService.findOne(projectId, user)
 return this.logsService.findOne(id, project)
}

@UseGuards(ApiKeyGuard)
@UseInterceptors(RequestLoggingInterceptor)
  @Post('request')
   capture(){
    return {
      message: 'Request logged successfully'
    }
  }

}
