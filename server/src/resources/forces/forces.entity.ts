import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('forces')
export class Force {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	name!: string;

	@Column({nullable: true,default:1})
	competence!: 1 | 2 | 3;

	@Column('geography', { spatialFeatureType: 'Point', srid: 4326,nullable: true})
	location!: { type: 'Point'; coordinates: [number, number] };

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
