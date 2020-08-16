import {Document, Model, model, Schema} from 'mongoose';

import {TableNamesEnum} from '../../constants';
import {IAccessToken} from '../../models';

export type AccessTokenType = IAccessToken & Document

export const AccessTokenSchema: Schema = new Schema<IAccessToken>({
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: TableNamesEnum.USERS
  }
}, {
  timestamps: true
});

export const AccessTokenModel: Model<AccessTokenType> = model<AccessTokenType>(TableNamesEnum.ACCESS_TOKEN, AccessTokenSchema);
