import {LogsModel} from '../../dataBase';
import {ILogs} from '../../models';

class LogService {
  createLog(log: Partial<ILogs>): Promise<ILogs> {
    const logToCreate = new LogsModel(log);

    return logToCreate.save();
  }
}

export const logService = new LogService();
