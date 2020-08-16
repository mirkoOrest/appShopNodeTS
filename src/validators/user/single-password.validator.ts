import * as Joi from 'joi';

import {RegExpEnum} from '../../constants';

export const passwordValidator = Joi.object({
  password: Joi.string().trim().regex(RegExpEnum.password).required()
});
