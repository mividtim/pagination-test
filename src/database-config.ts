import * as path from "path";

import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

function envOrFail(key: string): string {
    const value = process.env[key];
    if (!value) {
        throw new Error(`process.env.${key} must be set.`);
    }
    return value;
}

export const dbOptions: ConnectionOptions = {
    database: envOrFail('DB_NAME'),
    entities: [path.resolve(__dirname, '**', 'db', '**', '*.entity.{ts,js}')],
    host: process.env.DB_HOST || 'localhost',
    migrations: [path.resolve(__dirname, '**', 'db', 'migrations', '*.{ts,js}')],
    namingStrategy: new SnakeNamingStrategy(),
    password: envOrFail('DB_PASSWORD'),
    port: Number(process.env.DB_PORT) || 5432,
    synchronize: true,
    type: 'postgres',
    username: envOrFail('DB_USERNAME'),
}
