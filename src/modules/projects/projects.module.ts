import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { LogsService } from '../logs/logs.service';
import { LogsModule } from '../logs/logs.module';
import { ApiKeysModule } from '../api-keys/api-keys.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), LogsModule,  ],
  controllers: [ProjectsController],
  providers: [ProjectsService,  ],
  exports: [ProjectsService]
})
export class ProjectsModule {}
