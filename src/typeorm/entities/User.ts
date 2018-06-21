import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Todo } from './Todo'

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  openId: string

  @Column('date')
  lastActived: Date

  @OneToMany(type => Todo, todo => todo.user)
  todos: Todo[]

  // constructor (openId: string, lastActived: Date) {
  //   this.openId = openId
  //   this.lastActived = lastActived
  // }
}
