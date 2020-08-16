import {Router} from 'express';

import {authController} from '../../controllers';
import {
  checkAccessTokenMiddleware,
  checkIsUserConfirmedMiddleware,
  checkIsUserExistByEmailMiddleware,
  emailPasswordValidatorMiddleware
} from '../../middlewares';

const router = Router();

router.post(
  '/',
  emailPasswordValidatorMiddleware,
  checkIsUserExistByEmailMiddleware,
  checkIsUserConfirmedMiddleware,
  authController.authUser
);
router.post('/logout', checkAccessTokenMiddleware, authController.logoutUser);

export const authRouter = router;

