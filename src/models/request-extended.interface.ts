import {Request} from 'express';
import {IUser} from './user.interface';

export interface IRequestExtanded extends Request{
  user: IUser
}
