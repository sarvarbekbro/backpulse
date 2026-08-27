import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorLog } from './entities/error-log.entity';
import { Repository } from 'typeorm';
import { CreateErrorLogDto } from './dtos/create-error-log.dto';
import { Project } from '../projects/entities/project.entity';

@Injectable()
export class ErrorLogsService {
constructor(@InjectRepository(ErrorLog) private readonly errorLogRepository: Repository<ErrorLog>){}


  create(dto: CreateErrorLogDto, project: Project ){
    const errorLog =  this.errorLogRepository.create({...dto, project })
   return this.errorLogRepository.save(errorLog)
  }

  findAll(project: Project){
  return this.errorLogRepository.find({where: {project: {id: project.id}}, order: {createdAt: 'DESC'}})

  }

 async  findOne(id: number, project: Project){
    const errorlogs = await this.errorLogRepository.findOne({where: {id, project: {id: project.id}}})

    if(!errorlogs){
      throw new NotFoundException('Project is not found ')
    }
    return errorlogs;
  }

}
