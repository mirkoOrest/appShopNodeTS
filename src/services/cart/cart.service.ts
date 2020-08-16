import {CartStatusEnum} from '../../constants';
import {CartModel} from '../../dataBase';
import {calculateCartPrice} from '../../helpers';
import {ICart, ICartProduct, IProduct} from '../../models';

class CartService {

  createCart(cart: Partial<ICart>): Promise<ICart> {
    const cartToCreate = new CartModel(cart);

    return cartToCreate.save();
  }

  addProductToCart(userCart: ICart, product: IProduct, productCount: number): Promise<ICart> {
    const productIndex =userCart.products.findIndex((value: ICartProduct) =>{
      return product._id.toString() === value.productId.toString();
    });

    if (productIndex !== -1) {
      userCart.products[productIndex].count += productCount;
    } else {
      userCart.products.push({
        count: productCount,
        productId:product._id,
        price: product.price
      });
    }

    userCart.sum = calculateCartPrice(userCart.products);

    return this.updateCart(userCart._id,userCart);
  }

  findUserProceedCart(userId: string): Promise<ICart> {
    return CartModel.findOne({
      status: CartStatusEnum.IN_PROGRESS,
      userId
    }) as any;
  }

  updateCart(_id: string, cartToUpdate: ICart): Promise<ICart> {
    return CartModel.findOneAndUpdate({_id},cartToUpdate, {new: true}) as any;
  }

  getCartsByParams(findObject: Partial<ICart>): Promise<ICart[]> {
    return CartModel.find(findObject) as any;
  }

  deleteCartById(_id: string) {
    return CartModel.findByIdAndRemove(_id);
  }
}

export const cartService = new CartService();
