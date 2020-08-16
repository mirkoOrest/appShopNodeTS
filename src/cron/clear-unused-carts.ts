import * as dayJs from 'dayjs';

import {CartStatusEnum} from '../constants';
import {IProduct} from '../models';
import {cartService} from '../services/cart';
import {productService} from '../services/product';

export const ClearUnusedCarts = async () => {

  const oldCarts = await cartService.getCartsByParams({
    status: CartStatusEnum.IN_PROGRESS,
    updatedAt:{
      $gte: dayJs(new Date()).subtract(1,'hour').format()
    } as any
  });

  for (const cart of oldCarts) {
    for (const product of cart.products) {
      const productToUpdate = await productService.findProductById(product.productId) as IProduct;
      if (productToUpdate) {
        await productService.updateProductById(product.productId, {stockCount: product.count + productToUpdate.stockCount});
      }
    }
    await cartService.deleteCartById(cart._id);
  }
};
