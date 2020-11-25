import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'construed' })
export class Construed {

    @PrimaryGeneratedColumn({ type: 'int4' })
    id!: number;

    @Column({ type: 'timestamp', nullable: true })
    dateTime!: Date | null;
}
