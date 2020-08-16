import {NextFunction, Response} from 'express';

import {ResponseStatusCodesEnum, UserStatusEnum} from '../../constants';
import {CustomErrors, ErrorHandler} from '../../Error';
import {IRequestExtended, IUser} from '../../models';

export const checkIsUserConfirmedMiddleware = (
  req: IRequestExtended,
  res: Response,
  next: NextFunction
): void | NextFunction => {

  const {status} = req.user as IUser;

  if (status !== UserStatusEnum.CONFIRMED) {
    return next(new ErrorHandler(
      ResponseStatusCodesEnum.FORBIDDEN,
      CustomErrors.FORBIDDEN_USER_NOT_CONFIRMED.message,
      CustomErrors.FORBIDDEN_USER_NOT_CONFIRMED.code
    ));
  }

  next();
};
