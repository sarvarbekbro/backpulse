import { Project } from "src/modules/projects/entities/project.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ErrorLog{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column()
  stack: string;

  @Column()
  method: string;

  @Column()
  path: string;

  @Column()
  statusCode: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Project, (project)  => project.error)
  project: Project;
}