import { ITask } from "./task";

export interface IStatusProject {
  id: number;
  name: string;
  color: string;
  project_id: number;
  is_final: boolean;
}

export interface IStatusProjectWithTasks extends IStatusProject {
  tasks: ITask[];
}
