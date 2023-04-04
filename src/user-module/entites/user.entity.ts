import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'increment_id' })
  id: number;

  @Column({ name: 'user_id', nullable: false, unique: true })
  userId: string;

  @Column({ name: 'email', nullable: false, unique: true })
  email: string;

  @Column({ name: 'username', nullable: false, unique: false })
  name: string;

  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  public updatedAt: Date;
}
