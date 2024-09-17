import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import {
  EmailConfigDto,
  SaveEmailConfigurationDto,
  SendEmailEmailResponse,
  SendEmailDto,
} from './email.dto';
import { EmailService } from './email.service';

@Resolver('Email')
export class EmailResolver {
  constructor(private readonly emailService: EmailService) {}

  @Query('getEmailConfig')
  async getEmailConfig(@Args('id') id: string): Promise<EmailConfigDto> {
    return this.emailService.getEmailConfig(id);
  }

  @Mutation('saveEmailConfig')
  async saveEmailConfig(
    @Args('payload') payload: SaveEmailConfigurationDto,
  ): Promise<EmailConfigDto> {
    const emailConfig = await this.emailService.saveEmailConfig(payload);
    return emailConfig;
  }

  @Mutation('sendEmail')
  async sendEmail(
    @Args('payload') payload: SendEmailDto,
  ): Promise<SendEmailEmailResponse> {
    const isEmailSent = await this.emailService.sendEmail(payload);
    console.log(`Send Email Payload`, payload);

    return {
      status: isEmailSent,
      message: isEmailSent ? 'Email sent successfully' : 'Failed to send email',
    };
  }
}
