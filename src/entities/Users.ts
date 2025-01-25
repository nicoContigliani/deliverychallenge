import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, ManyToMany, JoinTable, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Order } from './Order';

@Entity('User')
export class User {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname?: string;

  @Column({ unique: true })
  email?: string;

  @Column()
  password?: string;


  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}