import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname?: string;

  @Column({ unique: true })
  email?: string;

  @Column()
  password?: string;
}