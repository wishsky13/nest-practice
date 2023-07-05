import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ unique: true })
  account: string;

  @Column()
  role: string;
}