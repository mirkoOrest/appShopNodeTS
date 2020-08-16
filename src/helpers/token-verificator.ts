import {verify, VerifyErrors} from 'jsonwebtoken';
import {promisify} from 'util';

import {config} from '../config';
import {ActionEnum, ResponseStatusCodesEnum} from '../constants';
import {CustomErrors, ErrorHandler} from '../Error';

const verifyPromise = promisify(verify);

export const tokenVerificator = async (action: ActionEnum, token: string): Promise<VerifyErrors | null> => {
  try {
    let isValid;

    switch (action) {
      case ActionEnum.USER_AUTH:
        isValid = await verifyPromise(token, config.JWT_SECRET) as Promise<VerifyErrors | null>;
        break;

      case ActionEnum.USER_REGISTER:
        isValid = await verifyPromise(token, config.JWT_CONFIRM_EMAIL_SECRET) as Promise<VerifyErrors | null>;
        break;

      case ActionEnum.FORGOT_PASSWORD:
        isValid = await verifyPromise(token, config.JWT_PASS_RESET_SECRET) as Promise<VerifyErrors | null>;
        break;

      default:
        throw new ErrorHandler(ResponseStatusCodesEnum.SERVER, 'Wrong action type');
    }

    return isValid;
  } catch (e) {
    throw new ErrorHandler(ResponseStatusCodesEnum.UNAUTHORIZED, CustomErrors.UNAUTHORIZED_BAD_TOKEN.message);
  }

};
