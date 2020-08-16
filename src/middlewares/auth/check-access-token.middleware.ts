import {NextFunction, Response} from 'express';

import {ActionEnum, RequestHeadersEnum, ResponseStatusCodesEnum} from '../../constants';
import {CustomErrors, ErrorHandler} from '../../Error';
import {tokenVerificator} from '../../helpers/';
import {IRequestExtended} from '../../models';
import {authService} from '../../services';

export const checkAccessTokenMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.get(RequestHeadersEnum.AUTHORIZATION);

    if (!token) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, CustomErrors.BAD_REQUEST_NO_TOKEN.message));
    }

    await tokenVerificator(ActionEnum.USER_AUTH, token);

    const userByToken = await authService.findUserByToken({accessToken: token});

    if (!userByToken) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, CustomErrors.NOT_FOUND.message));
    }

    req.user = userByToken;

    next();
  } catch (e) {
    next(e);
  }

};
