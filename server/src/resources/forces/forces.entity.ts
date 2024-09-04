import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('forces')
export class Force {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	name!: string;

	@Column()
	competence!: 1 | 2 | 3;

	@Column()
	location!: string;

	@UpdateDateColumn({
		type: 'timestamptz',
		default: () => 'CURRENT_TIMESTAMP',
		onUpdate: 'CURRENT_TIMESTAMP',
	})
	updatedAt?: Date;

	@CreateDateColumn({
		type: 'timestamptz',
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt!: Date;
}
