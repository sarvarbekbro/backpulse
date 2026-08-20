import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiKey } from './entities/api-keys.entity';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { CreateApiKeyDto } from './dtos/create-apikey.dto';
import { Project } from '../projects/entities/project.entity';
import { UpdateApiKeyDto } from './dtos/update-apikey.dto';

@Injectable()
export class ApiKeysService {
  constructor(
    @InjectRepository(ApiKey)
    private readonly apiKeysRepository: Repository<ApiKey>,
  ) {}

  async create(dto: CreateApiKeyDto, project: Project) {
    const rawKey = `bp_live_${randomBytes(32).toString('hex')}`;

    const keyHash = await bcrypt.hash(rawKey, 10);

    const apiKey = this.apiKeysRepository.create({
      name: dto.name,
      keyHash,
      project,
    });
    await this.apiKeysRepository.save(apiKey);

    return {
      id: apiKey.id,
      name: apiKey.name,
      apiKey: rawKey,
    };
  }
  async findAll(project: Project) {
    const apiKeys = await this.apiKeysRepository.find({
      where: { project: { id: project.id } },
    });
    return apiKeys;
  }

  async findOne(id: number, project: Project) {
    const apiKey = await this.apiKeysRepository.findOne({
      where: { id, project: {id: project.id} },
    });
    if (!apiKey) {
      throw new NotFoundException('Api key not found ');
    }
    return apiKey;
  }
  async update(id: number, dto: UpdateApiKeyDto, project: Project) {
    const apiKey = await this.apiKeysRepository.findOne({
      where: { id, project: {id: project.id} },
    });
    if (!apiKey) {
      throw new NotFoundException('Api key  not found');
    }
    Object.assign(apiKey, dto);
    return this.apiKeysRepository.save(apiKey);
  }

  // async remove(id: number, project: Project){
  //   const apiKey = await this.apiKeysRepository.findOne({where: {id, project}})
  //   if(!apiKey){
  //     throw new NotFoundException('Api key not found')
  //   }
  //   await this.apiKeysRepository.remove(apiKey)

  //   return {
  //     messsage: 'APi key removed successfully'
  //   };
  // }
  async revoke(id: number, project: Project) {
    const apiKey = await this.apiKeysRepository.findOne({
      where: { id, project: {id: project.id} },
    });
    if (!apiKey) {
      throw new NotFoundException('Api key not found');
    }
    apiKey.isActive = false;
    return this.apiKeysRepository.save(apiKey);
  }
}
