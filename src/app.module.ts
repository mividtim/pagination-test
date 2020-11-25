import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbOptions } from './database-config';
import { Construed } from './db/construed.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot(dbOptions),
        TypeOrmModule.forFeature([
            Construed,
        ]),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
