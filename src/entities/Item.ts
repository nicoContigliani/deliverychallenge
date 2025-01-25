import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Order } from './Order';

@Entity('Item')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true }) // Tipo text para descripciones más largas
  description: string;

  @Column({ type: 'numeric' })
  price: number;

  @UpdateDateColumn() // Fecha de última actualización
  updatedAt: Date;

  @DeleteDateColumn() // Fecha de borrado (para borrado lógico)
  deletedAt?: Date;

  @ManyToMany(() => Order, (order) => order.items)
  orders: Order[];
}