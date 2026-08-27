import { forwardRef, Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { LogsModule } from '../logs/logs.module';
import { ErrorLogsModule } from '../error-logs/error-logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), forwardRef(() => LogsModule), forwardRef(() => ErrorLogsModule) ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService]
})
export class ProjectsModule {}
