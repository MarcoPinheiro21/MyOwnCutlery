import User from './user.model';

export interface LoginResultModel {
  token?: string;
  success?: string;
  message?: string;
  user?: User;
}
