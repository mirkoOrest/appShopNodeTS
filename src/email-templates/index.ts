import {ActionEnum} from '../constants';

export const htmlTemplates: {[index: string]: {subject: string, templateFileName: string}} = {
  [ActionEnum.USER_REGISTER]: {
    subject: 'Welcome',
    templateFileName: 'user-welcome'
  },
  [ActionEnum.FORGOT_PASSWORD]: {
    subject: 'Wrong password',
    templateFileName: 'forgot-password'
  }
};
