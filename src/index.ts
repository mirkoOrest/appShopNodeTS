import * as http from 'http';

import {app} from './app';
import {config} from './config';
import {cronRun} from './cron';

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`Port was started on ${config.PORT}`);
});

cronRun();

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});

process.on('uncaughtException', error => {
  console.log(error);
});

process.on('unhandledRejection', error => {
  console.log(error);
});
