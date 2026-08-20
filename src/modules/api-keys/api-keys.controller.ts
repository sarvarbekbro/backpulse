
import { Body, Controller, Get, Param, ParseIntPipe, Post, Patch, UseGuards } from '@nestjs/common';
import { ApiKeysService } from './api-keys.service';
import { CreateApiKeyDto } from './dtos/create-apikey.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { ProjectsService } from '../projects/projects.service';
import { UpdateApiKeyDto } from './dtos/update-apikey.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { Serialize } from 'src/common/decorators/serialize.decorator';
import { ApiKeyResponseDto } from './dtos/api-key-response.dto';

@Serialize(ApiKeyResponseDto)
@UseGuards(JwtAuthGuard)
@Controller('projects/:projectId/api-keys')
export class ApiKeysController {
  constructor(
    private readonly apikeyService: ApiKeysService,
    private readonly projectService: ProjectsService,
  ) {}

  @Post()
 async create(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() dto: CreateApiKeyDto,
    @CurrentUser() user: User,

  ) {
    const project = await this.projectService.findOne(projectId, user)
    return this.apikeyService.create(dto, project)
  }
  @Get()
 async  findAll (@Param('projectId', ParseIntPipe) projectId: number, @CurrentUser() user: User){
  const project = await this.projectService.findOne(projectId, user)
  return this.apikeyService.findAll(project)
 }

 @Get(':id')
 async findOne (@Param('projectId', ParseIntPipe)projectId: number, @Param('id', ParseIntPipe) id: number,  @CurrentUser()user: User){
  const project = await this.projectService.findOne(projectId, user)
  return this.apikeyService.findOne(id, project)
 }
 @Patch(':id')
  async update(@Param('projectId', ParseIntPipe) projectId: number,@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateApiKeyDto, @CurrentUser() user: User ){
  const project = await this.projectService.findOne(projectId, user)
  return this.apikeyService.update(id, dto, project)
  }

  @Patch(':id/revoke')
  async revoke(@Param('projectId', ParseIntPipe)projectId: number, @Param('id', ParseIntPipe) id: number, @CurrentUser() user: User){
    const project = await this.projectService.findOne(projectId, user)
    return this.apikeyService.revoke(id, project)
  }
}
