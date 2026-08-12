import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestLog } from './entities/request-log.entity';
import { Repository } from 'typeorm';
import { RequestLogData } from './interfaces/request-log-data.interface';
import { Project } from '../projects/entities/project.entity';

@Injectable()
export class LogsService {
  constructor(@InjectRepository(RequestLog) private readonly requestLogsRepository: Repository<RequestLog>){}

async create(data: RequestLogData){
  const log = this.requestLogsRepository.create(data)
  return this.requestLogsRepository.save(log)
}
async findAll(project: Project) {
  return this.requestLogsRepository.find({where: {project: { id: project.id}}, order: {createdAt: 'DESC'}})

}

async findOne(id: number, project: Project){
  const log = await this.requestLogsRepository.findOne({
    where: {id, project: {id: project.id}}
  })
  if(!log){
    throw new NotFoundException('Request log not found')
  }
  return log;
}
}
