
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum EmailEncryptionType {
    None = "None",
    SSL = "SSL",
    TLS = "TLS"
}

export class EmailConfigurationInput {
    id?: Nullable<string>;
    fromName: string;
    fromEmail: string;
    username: string;
    password: string;
    smtpHost: string;
    smtpPort: number;
    smtpEncryption: EmailEncryptionType;
    messagePerDay: number;
    minTimeGap?: Nullable<number>;
    replyToEmail?: Nullable<string>;
    useDifferentEmailForImap?: Nullable<boolean>;
    imapHost?: Nullable<string>;
    imapPort?: Nullable<number>;
    imapEncryption?: Nullable<EmailEncryptionType>;
}

export class SendEmail {
    emailConfigId: string;
    to: string;
    subject: string;
    body: string;
}

export class EmailConfiguration {
    id?: Nullable<string>;
    fromName?: Nullable<string>;
    fromEmail?: Nullable<string>;
    username?: Nullable<string>;
    password?: Nullable<string>;
    smtpHost?: Nullable<string>;
    smtpPort?: Nullable<number>;
    smtpEncryption?: Nullable<EmailEncryptionType>;
    messagePerDay?: Nullable<number>;
    minTimeGap?: Nullable<number>;
    replyToEmail?: Nullable<string>;
    useDifferentEmailForImap?: Nullable<boolean>;
    imapHost?: Nullable<string>;
    imapPort?: Nullable<number>;
    imapEncryption?: Nullable<EmailEncryptionType>;
}

export class SaveEmailConfigResponse {
    id?: Nullable<string>;
}

export class SendEmailResponse {
    status?: Nullable<boolean>;
    message?: Nullable<string>;
}

export abstract class IQuery {
    abstract getEmailConfig(id: string): Nullable<EmailConfiguration> | Promise<Nullable<EmailConfiguration>>;
}

export abstract class IMutation {
    abstract saveEmailConfig(payload: EmailConfigurationInput): Nullable<EmailConfiguration> | Promise<Nullable<EmailConfiguration>>;

    abstract sendEmail(payload: SendEmail): Nullable<SendEmailResponse> | Promise<Nullable<SendEmailResponse>>;
}

type Nullable<T> = T | null;
