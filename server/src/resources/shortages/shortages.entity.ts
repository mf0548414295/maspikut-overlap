import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Force } from '../forces/forces.entity';

export enum ShortageStatus {
  OPEN = 1,
  IN_PROGRESS = 2,
  CLOSED = 3,
}

@Entity('shortages')
export class Shortage {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Force, { onDelete: 'CASCADE' })
  force!: Force;

  @Column()
  name!: string;

  @Column({
    type: 'enum',
    enum: ShortageStatus,
  })
  status!: ShortageStatus;

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
