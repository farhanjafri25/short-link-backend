import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'short_links' })
export class ShortLinkEntity {
  @PrimaryGeneratedColumn({ name: 'increment_id' })
  id: number;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'url', nullable: false, unique: true })
  url: string;

  @Column({ name: 'short_code', nullable: false, unique: true })
  shortCode: string;

  @Column({ name: 'is_deleted', nullable: false, default: false })
  isDeleted: boolean;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Column({ type: 'timestamp' })
  expirationDate: Date;
}
