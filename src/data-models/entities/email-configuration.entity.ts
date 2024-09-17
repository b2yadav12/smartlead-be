import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  EMAIL_ENCRYPTION_TYPES,
  DEFAULT_SMTP_PORT,
  DEFAULT_SMTP_ENCRYPTION,
  DEFAULT_IMAP_ENCRYPTION,
  DEFAULT_MESSAGE_PER_DAY,
} from '../../constants';

@Entity('email_configurations')
export class EmailConfiguration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'from_name', length: 255 })
  fromName: string;

  @Column({ name: 'from_email', length: 255 })
  fromEmail: string;

  @Column({ name: 'username', length: 255 })
  username: string;

  @Column({ name: 'password', length: 255 })
  password: string;

  @Column({ name: 'smtp_host', length: 255 })
  smtpHost: string;

  @Column({ name: 'smtp_port', default: DEFAULT_SMTP_PORT })
  smtpPort: number;

  @Column({
    name: 'smtp_encryption',
    type: 'enum',
    enum: [
      EMAIL_ENCRYPTION_TYPES.SSL,
      EMAIL_ENCRYPTION_TYPES.TLS,
      EMAIL_ENCRYPTION_TYPES.NONE,
    ],
    default: DEFAULT_SMTP_ENCRYPTION,
  })
  smtpEncryption: string;

  @Column({ name: 'message_per_day', default: DEFAULT_MESSAGE_PER_DAY })
  messagePerDay: number;

  @Column({ name: 'min_time_gap', nullable: true })
  minTimeGap: number;

  @Column({ name: 'reply_to_email', length: 255, nullable: true })
  replyToEmail: string; // default will be from email

  @Column({ name: 'imap_host', length: 255, nullable: true })
  imapHost: string;

  @Column({ name: 'imap_port', nullable: true })
  imapPort: number;

  @Column({
    name: 'imap_encryption',
    type: 'enum',
    enum: [
      EMAIL_ENCRYPTION_TYPES.SSL,
      EMAIL_ENCRYPTION_TYPES.TLS,
      EMAIL_ENCRYPTION_TYPES.NONE,
    ],
    default: DEFAULT_IMAP_ENCRYPTION,
  })
  imapEncryption: string;

  @Column({ name: 'use_different_email_for_imap', default: false })
  useDifferentEmailForImap: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
