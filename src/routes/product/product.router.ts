import {Router} from 'express';

import {productController} from '../../controllers';
import {checkAccessTokenMiddleware, newProductValidatorMiddleware} from '../../middlewares';

const router = Router();

router.post('/',checkAccessTokenMiddleware,newProductValidatorMiddleware, productController.createProduct);

export const productRouter = router;

