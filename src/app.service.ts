import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Construed } from './db/construed.entity';
import { Repository } from 'typeorm';
import { buildPaginator } from 'typeorm-cursor-pagination';

export interface ConstruedPage {
    afterCursor: string | null;
    beforeCursor: string | null;
    construed: Array<Construed>;
}

@Injectable()
export class AppService {

    constructor(
        @InjectRepository(Construed)
        private readonly construedRepository: Repository<Construed>
    ) {}

    async getHello(
        limit?: number,
        afterCursor?: string,
        beforeCursor?: string,
    ): Promise<ConstruedPage> {
        const query = this.construedRepository
            .createQueryBuilder('construed');
        const paginator = buildPaginator({
            alias: 'construed',
            entity: Construed,
            paginationKeys: ['dateTime', 'id'],
            query: {
                afterCursor,
                beforeCursor,
                limit,
                order: 'DESC',
            },
        });
        const results = await paginator.paginate(query);
        return {
            afterCursor: results.cursor.afterCursor,
            beforeCursor: results.cursor.beforeCursor,
            construed: results.data,
        };
    }
}
