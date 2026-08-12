import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor (private readonly projectService: ProjectsService){}

  @Post()
  create(@Body() dto: CreateProjectDto, @CurrentUser() owner: User){
return this.projectService.create(dto, owner)
  }
  @Get()
  findAll(@CurrentUser() owner: User){
return this.projectService.findAll(owner)
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe)id: number, @CurrentUser() owner: User){
    return this.projectService.findOne(id, owner)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe)id: number, @Body() dto: UpdateProjectDto, @CurrentUser() owner: User){
    return this.projectService.update(id, dto, owner)
  }
  @Delete(':id')
  remove(@Param('id', ParseIntPipe)id: number, @CurrentUser() owner: User){
    return this.projectService.remove(id, owner)
  }
}
