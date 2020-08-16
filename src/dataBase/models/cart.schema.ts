import {Document, Model, model, Schema, SchemaTypes} from 'mongoose';

import {CartStatusEnum, TableNamesEnum} from '../../constants/';
import {ICart} from '../../models/';

export type CartType = ICart & Document

const productSubModel = {
  productId: {
    type:  SchemaTypes.ObjectId,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: false
  }
};

export const CartSchema: Schema = new Schema<ICart>({
  products :[productSubModel],
  status:{
    type: String,
    required: true,
    default: CartStatusEnum.IN_PROGRESS,
    enum: Object.values(CartStatusEnum)
  },
  sum: {
    type: Number,
    required: true,
    default: 0
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: TableNamesEnum.USERS
  }
},
{timestamps: true}
);

export const CartModel: Model<CartType> = model<CartType>(TableNamesEnum.CART, CartSchema);
