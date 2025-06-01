import { IUserWithRole } from "./user.interface";

export interface IMessage {
  id: number;
  message?: string | null;
  file?: string | null;
  fileDownloadUrl: string | null;
  fileName?: string | null;
  projectId: number;
  user: IUserWithRole;
  createdAt: Date;
}
