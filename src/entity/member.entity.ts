import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Log } from './log.entity';
@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ unique: true })
  account: string;

  @Column()
  role: string;

  @CreateDateColumn()
  public created_at?: Date;

  @OneToMany(() => Log, (log) => log.member)
  logs: Log[];
}
