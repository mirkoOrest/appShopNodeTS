import {NextFunction, Request, Response} from 'express';

import {ResponseStatusCodesEnum} from '../../constants';
import {CustomErrors, ErrorHandler} from '../../Error';
import {userService} from '../../services';

export const checkIsEmailExistMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> => {
  const {email} = req.body;

  const userByEmail = await userService.findOneByParams({email});

  if (userByEmail) {
    return next(new ErrorHandler(
      ResponseStatusCodesEnum.BAD_REQUEST,
      CustomErrors.BAD_REQUEST_USER_REGISTERED.message,
      CustomErrors.BAD_REQUEST_USER_REGISTERED.code
    ));
  }

  next();
};
