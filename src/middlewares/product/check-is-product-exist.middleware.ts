import {NextFunction, Response} from 'express';

import {ResponseStatusCodesEnum} from '../../constants';
import {CustomErrors, ErrorHandler} from '../../Error';
import {IRequestExtended} from '../../models';
import {productService} from '../../services/product';

export const CheckIsProductExistMiddleware =
  async (req: IRequestExtended, res: Response, next: NextFunction): Promise<any> => {
    const {productId} = req.params;

    const product = await productService.findProductById(productId);

    if (!product) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, CustomErrors.NOT_FOUND.message));
    }

    if (!product.stockCount) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, CustomErrors.BAD_REQUEST_NO_STOCK.message));
    }

    req.product = product;
    next();
  };
