import { Project } from "src/modules/projects/entities/project.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ApiKey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  keyHash: string;

  @Column({default: true})
  isActive: boolean;

  @Column({type: 'timestamp', nullable: true})
  lastUsedAt: Date | null;

  @Column({type: 'timestamp',nullable: true })
  expiresAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne( () => Project, (project) => project.apiKeys)
  project: Project;
}