import { ConnectionOptions } from 'typeorm';

import { dbOptions } from './src/database-config';

const opts: ConnectionOptions = dbOptions;
module.exports = opts;
