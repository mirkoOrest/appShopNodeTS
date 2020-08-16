import {NextFunction, Response} from 'express';

import {ResponseStatusCodesEnum} from '../../constants';
import {CustomErrors, ErrorHandler} from '../../Error';
import {IProduct, IRequestExtended, IUser} from '../../models';
import {cartService, productService} from '../../services';

class CartController {
  async addProductToCart(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const {_id: userId} = req.user as IUser;
      const product = req.product as IProduct;
      const {count} = req.body;

      if (product.stockCount < count) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, CustomErrors.BAD_REQUEST_WRONG_COUNT.message));
      }

      let userCart = await cartService.findUserProceedCart(userId);

      if (!userCart) {
        userCart = await cartService.createCart({userId});
      }

      const iCart = await cartService.addProductToCart(userCart, product, count);

      await productService.updateProductById(product._id, {stockCount: product.stockCount - count});

      res.json(iCart);
    } catch (e) {
      next(e);
    }
  }

  async getUserCart(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const {_id: userId} = req.user as IUser;

      const userCart = await cartService.findUserProceedCart(userId);

      res.json(userCart);
    } catch (e) {
      next(e);
    }
  }
}

export const cartController = new CartController();
