"use strict";
exports.__esModule = true;
var path = require("path");
var typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
function envOrFail(key) {
    var value = process.env[key];
    if (!value) {
        throw new Error("process.env." + key + " must be set.");
    }
    return value;
}
exports.dbOptions = {
    database: envOrFail('DB_NAME'),
    entities: [path.resolve(__dirname, '**', 'db', '**', '*.entity.{ts,js}')],
    host: process.env.DB_HOST || 'localhost',
    migrations: [path.resolve(__dirname, '**', 'db', 'migrations', '*.{ts,js}')],
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
    password: envOrFail('DB_PASSWORD'),
    port: Number(process.env.DB_PORT) || 5432,
    synchronize: true,
    type: 'postgres',
    username: envOrFail('DB_USERNAME')
};
