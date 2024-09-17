import {
  IsString,
  IsEmail,
  IsOptional,
  IsInt,
  IsIn,
  Min,
  Max,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { EMAIL_ENCRYPTION_TYPES } from '../../constants';
import { EmailConfiguration } from '../../data-models/entities/email-configuration.entity';

export interface SendEmailEmailResponse {
  status: boolean;
  message: string;
}

export class EmailConfigDto extends EmailConfiguration {}

export class SaveEmailConfigurationDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  fromName: string;

  @IsEmail()
  @IsNotEmpty()
  fromEmail: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  smtpHost: string;

  @IsInt()
  @Min(1)
  @Max(65535)
  @IsNotEmpty()
  smtpPort: number;

  @IsNotEmpty()
  @IsIn(Object.values(EMAIL_ENCRYPTION_TYPES), {
    message: 'Invalid smtp encryption',
  })
  smtpEncryption: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  messagePerDay: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  minTimeGap: number;

  @IsOptional()
  @IsEmail()
  replyToEmail: string;

  @IsOptional()
  @IsString()
  imapHost: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(65535)
  imapPort: number;

  @IsOptional()
  @IsIn(Object.values(EMAIL_ENCRYPTION_TYPES), {
    message: 'Invalid imap encryption',
  })
  imapEncryption: string;

  @IsBoolean()
  @IsOptional()
  useDifferentEmailForImap: boolean;
}

export class SendEmailDto {
  @IsString()
  @IsNotEmpty()
  emailConfigId: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid to email address' })
  to: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  body: string;
}
