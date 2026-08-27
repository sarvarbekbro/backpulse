import { ApiKey } from 'src/modules/api-keys/entities/api-keys.entity';
import { ErrorLog } from 'src/modules/error-logs/entities/error-log.entity';
import { RequestLog } from 'src/modules/logs/entities/request-log.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  environment: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.projects, {onDelete: 'CASCADE'})
  owner: User;

  @OneToMany(() => RequestLog, (log) => log.project)
  logs: RequestLog[];

  @OneToMany(() => ApiKey, (apiKey) => apiKey.project)
  apiKeys: ApiKey[];

  @OneToMany(()=> ErrorLog, (errorlog) => errorlog.project)
  Errorlogs: ErrorLog[]
}
