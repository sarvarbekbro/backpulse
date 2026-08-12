import { UpdateProjectDto } from './dto/update-project.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { User } from '../users/entities/user.entity';


@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Project) private readonly projectsRepository: Repository<Project>){}

  async create(dto:CreateProjectDto, owner: User){
const project =  this.projectsRepository.create({
  ...dto,
  owner
})
return await this.projectsRepository.save(project)
  }
  async findAll(owner: User){
    const projects = await this.projectsRepository.find({where: {owner}})
    return projects
  }

 async findOne(id: number, owner: User){
  const project = await this.projectsRepository.findOneBy({id, owner})
  if(!project){
    throw new NotFoundException('Project not found')
  }
  return project;
 }

  async update(id: number, dto: UpdateProjectDto, owner: User){
    const project = await this.projectsRepository.findOne({where: {id, owner}})
if(!project){
  throw new NotFoundException('Project not found')
}
Object.assign(project, dto)
return this.projectsRepository.save(project)
  }

  async remove(id: number, owner: User){
    const project = await this.projectsRepository.findOne({where: {id, owner}})

    if(!project){
      throw new NotFoundException('Project not found')
    }
 return await this.projectsRepository.remove(project)

  }
}
