import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateConstrued1606322509322 implements MigrationInterface {

    public async up(queryRunner: QueryRunner) {
        await queryRunner.query(`
            INSERT INTO construed (date_time) (
                SELECT NOW() + i * interval '1 MINUTE'
                FROM generate_series(1, 7) AS i
            );
        `);
    }

    public async down(queryRunner: QueryRunner) {
        await queryRunner.query('DELETE FROM construed WHERE true;');
    }
}
