import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from './User'

@Entity()
export class Todo {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => User, user => user.todos)
  user: User

  @Column('date')
  date: Date

  @Column('tinyint')
  status: number

  @Column({ type: 'varchar', length: 255 })
  content: string

  // constructor (date: Date, content: string, user?: User) {
  //   this.date = date
  //   this.content = content
  //   this.status = 0
  //   if (user) {
  //     this.user = user
  //   }
  // }
}
