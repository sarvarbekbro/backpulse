import { forwardRef, Module } from '@nestjs/common';
import { ErrorLogsController } from './error-logs.controller';
import { ErrorLogsService } from './error-logs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorLog } from './entities/error-log.entity';
import { Project } from '../projects/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ErrorLog]), forwardRef(() => Project)],
  controllers: [ErrorLogsController],
  providers: [ErrorLogsService]
})
export class ErrorLogsModule {}
