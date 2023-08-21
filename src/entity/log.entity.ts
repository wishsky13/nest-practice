import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ip: string;

  @CreateDateColumn()
  public created_at?: Date;

  @ManyToOne(() => Member, (member) => member.id)
  member: Member;
}
