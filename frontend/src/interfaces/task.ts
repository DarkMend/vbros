import { IUserWithRole } from "./user.interface";

export interface ITask {
  id: number;
  description: string;
  completionTime: Date;
  projectId: number;
  statusProjectId: number;
  updatedAt: Date;
  userId: IUserWithRole;
}
