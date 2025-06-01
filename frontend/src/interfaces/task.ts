import { IUserWithRole } from "./user.interface";

export interface ITask {
  id: number;
  description: string;
  completion_time: Date;
  project_id: number;
  status_project_id: number;
  updated_at: Date;
  user: IUserWithRole | number | null;
}
