import * as cron from 'node-cron';

import {config} from '../config';
import {ClearUnusedCarts} from '../cron';

export const cronRun = () => {
  cron.schedule(config.CRON_JOB_PERIOD, async () => {
    await ClearUnusedCarts();
  });
};
