import { Project } from "src/modules/projects/entities/project.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RequestLog{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.logs)
  project: Project;

  @Column()
  method: string;

  @Column()
  path: string;

  @Column()
  statusCode: number;

  @Column()
  responseTime: number;

  @Column()
  ip: string;

  @Column()
  userAgent: string;

  @CreateDateColumn()
  createdAt: Date;
}