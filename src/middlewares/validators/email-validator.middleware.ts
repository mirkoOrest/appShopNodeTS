import {NextFunction, Request, Response} from 'express';
import * as Joi from 'Joi';

import {ResponseStatusCodesEnum} from '../../constants';
import {ErrorHandler} from '../../Error';
import {emailValidator} from '../../validators/';

export const emailValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const {error} = Joi.validate(req.body, emailValidator);

  if (error) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
  }

  next();
};
