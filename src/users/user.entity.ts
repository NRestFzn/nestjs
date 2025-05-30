import { NonAttribute } from 'sequelize';
import {
  Table,
  Column,
  Model,
  Unique,
  IsEmail,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import { Todo } from 'src/todo/todo.entity';

@Table({
  tableName: 'users',
})
export class User extends Model<User> {
  @Column({
    type: DataType.NUMBER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  declare id: number;

  @Unique
  @IsEmail
  @Column({ type: DataType.STRING, allowNull: false })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare fullName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @CreatedAt
  @Column({ type: DataType.DATEONLY })
  declare created_at: Date;

  @UpdatedAt
  @Column({ type: DataType.DATEONLY })
  declare updated_at: Date;

  @HasMany(() => Todo, 'user_id')
  declare todos?: NonAttribute<Todo[]>;
}
