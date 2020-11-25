import * as path from "path";

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Construed } from './db/construed.entity';

function envOrFail(key: string): string {
    const value = process.env[key];
    if (!value) {
        throw new Error(`process.env.${key} must be set.`);
    }
    return value;
}

@Module({
    imports: [
        TypeOrmModule.forRoot({
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
        }),
        TypeOrmModule.forFeature([
            Construed,
        ]),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
