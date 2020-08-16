import {NextFunction, Response} from 'express';

import {IRequestExtended, IUser} from '../../models';
import {productService} from '../../services/product.service';
import {logService} from '../../services/log.service';
import {LogsEnum} from '../../constants';

class ProductController {

  async createProduct(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const {_id} = req.user as IUser;
      const product = req.body;
      const newProduct = await productService.createProduct({...product, userId:_id});

      await logService.createLog({
        userId: _id,
        event: LogsEnum.PRODUCT_CREATED,
        data:{
          productId: newProduct._id,
          title: newProduct.title
        }
      });

      res.json(newProduct);
    } catch (e) {
      next(e);
    }
  }
}

export const productController = new ProductController();
