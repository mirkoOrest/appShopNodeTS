import {NextFunction, Response} from 'express';

import {ResponseStatusCodesEnum} from '../../constants';
import {CustomErrors, ErrorHandler} from '../../Error';
import {IRequestExtended} from '../../models';
import {userService} from '../../services';

export const checkIsUserExistByEmailMiddleware =
  async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void | NextFunction> => {
    const {email} = req.body;
    const userByEmail = await userService.findOneByParams({email});

    if (!userByEmail) {
      return next(new ErrorHandler(
        ResponseStatusCodesEnum.NOT_FOUND,
        CustomErrors.NOT_FOUND.message
      ));
    }

    req.user = userByEmail;

    next();
  };
