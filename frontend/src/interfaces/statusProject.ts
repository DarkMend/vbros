import { ITask } from "./task";

export interface IStatusProject {
  id: number;
  name: string;
  color: string;
  project_id: number;
}

export interface IStatusProjectWithTasks extends IStatusProject {
  tasks: ITask[];
}
