import { Project } from "src/modules/projects/entities/project.entity";

export interface RequestLogData {
  project: Project;
  method: string;
  path: string;
  statusCode: number;
  responseTime: number;
  ip: string;
  userAgent: string;
}