import { forwardRef, Module } from '@nestjs/common';
import { ApiKeysService } from './api-keys.service';
import { ApiKeysController } from './api-keys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKey } from './entities/api-keys.entity';
import { ProjectsModule } from '../projects/projects.module';
import { LogsModule } from '../logs/logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([ApiKey]), forwardRef(() => ProjectsModule), forwardRef(()=> LogsModule)],
  providers: [ApiKeysService],
  controllers: [ApiKeysController],
  exports: [ApiKeysService]
})
export class ApiKeysModule {}
