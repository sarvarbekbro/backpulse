import { Expose } from "class-transformer";
import { Project } from "src/modules/projects/entities/project.entity";

export class ApiKeyResponseDto{
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  isActive: boolean;

  @Expose()
  lastUsedAt: Date;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
