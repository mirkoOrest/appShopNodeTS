import {Document, model, Model, Schema, SchemaTypes} from 'mongoose';

import {TableNamesEnum} from '../../constants';
import {ILogs} from '../../models';

export type LogsType = ILogs & Document

export const LogsSchema: Schema = new Schema<ILogs>({
  event: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  data: SchemaTypes.Mixed
},
{timestamps: true}
);

export const LogsModel: Model<LogsType> = model<LogsType>(TableNamesEnum.LOGS, LogsSchema);
