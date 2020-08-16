import * as Joi from 'joi';

import {GenderEnum, RegExpEnum} from '../../constants';

export const newUserValidator = Joi.object({
  age: Joi.number().integer().min(1).max(120).required(),
  email: Joi.string().trim().regex(RegExpEnum.email).required(),
  gender: Joi.string().trim().allow(GenderEnum.MALE,GenderEnum.FEMALE),
  name: Joi.string().trim().min(2).max(25).required(),
  password: Joi.string().trim().regex(RegExpEnum.password).required(),
  phone: Joi.string().trim().regex(RegExpEnum.phone),
  surname: Joi.string().trim().min(2).max(25).required()
});
