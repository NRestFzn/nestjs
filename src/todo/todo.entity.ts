import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/users/user.entity';

@Table({
  tableName: 'todos',
})
export class Todo extends Model<Todo> {
  @Column({
    type: DataType.NUMBER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  declare id: number;

  @Column({ allowNull: false, type: DataType.STRING })
  declare todo: string;

  @Column({ allowNull: false, type: DataType.NUMBER })
  declare user_id: number;

  @BelongsTo(() => User, 'user_id')
  declare user: User;

  @CreatedAt
  @Column({ type: DataType.DATEONLY })
  declare created_at: Date;

  @UpdatedAt
  @Column({ type: DataType.DATEONLY })
  declare updated_at: Date;
}
