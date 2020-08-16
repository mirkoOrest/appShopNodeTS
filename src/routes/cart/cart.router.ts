import {Router} from 'express';

import {cartController} from '../../controllers';
import {
  addProductToCartValidatorMiddleware,
  checkAccessTokenMiddleware,
  CheckIsProductExistMiddleware,
  checkIsUserConfirmedMiddleware
} from '../../middlewares';

const router = Router();

router.use(checkAccessTokenMiddleware, checkIsUserConfirmedMiddleware);

router.get('/proceed', cartController.getUserCart);

router.use('/products/:productId', CheckIsProductExistMiddleware);
router.post('/products/:productId', addProductToCartValidatorMiddleware, cartController.addProductToCart);

export const cartRouter = router;

