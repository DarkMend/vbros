export interface IUser {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
}

export interface IUserWithRole extends IUser {
  role: string;
}
