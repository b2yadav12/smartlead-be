import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { EmailConfiguration } from '../../data-models/entities/email-configuration.entity';
import { EMAIL_ENCRYPTION_TYPES } from '../../constants';
import {
  SaveEmailConfigurationDto,
  EmailConfigDto,
  SendEmailDto,
} from './email.dto';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(EmailConfiguration)
    private readonly emailConfigRepo: Repository<EmailConfiguration>,
  ) {}

  async sendEmail(data: SendEmailDto): Promise<boolean> {
    const emailConfig = await this.emailConfigRepo.findOne({
      where: { id: data.emailConfigId },
    });
    if (!emailConfig) {
      throw new Error('Email configuration not found');
    }
    console.log(`emailConfig Data`, emailConfig);

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: emailConfig.smtpHost,
      port: emailConfig.smtpPort,
      secure: emailConfig.smtpEncryption !== EMAIL_ENCRYPTION_TYPES.NONE, // true for SSL/TLS, false otherwise
      auth: {
        user: emailConfig.username,
        pass: emailConfig.password,
      },
    } as nodemailer.TransportOptions);

    // Email options
    const mailOptions = {
      from: `${emailConfig.fromName} <${emailConfig.fromEmail}>`,
      to: data.to,
      subject: data.subject,
      html: data.body,
      replyTo: emailConfig.replyToEmail, // Optional field
    };

    try {
      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  async getEmailConfig(id: string): Promise<EmailConfigDto> {
    const emailConfig = await this.emailConfigRepo.findOne({
      where: { id },
    });
    if (!emailConfig) {
      throw new Error('Email configuration not found');
    }
    return emailConfig;
  }

  async saveEmailConfig(
    data: SaveEmailConfigurationDto,
  ): Promise<EmailConfigDto> {
    // Create a new email configuration or update an existing one

    let emailConfig: EmailConfiguration;
    if (data.id) {
      emailConfig = await this.emailConfigRepo.findOne({
        where: { id: data.id },
      });
      if (!emailConfig) {
        throw new Error('Email configuration not found');
      }
    } else {
      emailConfig = new EmailConfiguration();
    }

    emailConfig.fromName = data.fromName;
    emailConfig.fromEmail = data.fromEmail;
    emailConfig.username = data.username;
    emailConfig.password = data.password;
    emailConfig.smtpHost = data.smtpHost;
    emailConfig.smtpPort = data.smtpPort;
    emailConfig.smtpEncryption = data.smtpEncryption;
    emailConfig.messagePerDay = data.messagePerDay;
    emailConfig.minTimeGap = data.minTimeGap;
    emailConfig.replyToEmail = data.replyToEmail;
    emailConfig.imapHost = data.imapHost;
    emailConfig.imapPort = data.imapPort;
    emailConfig.imapEncryption = data.imapEncryption;
    return this.emailConfigRepo.save(emailConfig);
  }
}
