import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1726478336011 implements MigrationInterface {
    name = 'Init1726478336011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`email_configurations\` (
                \`id\` varchar(36) NOT NULL,
                \`from_name\` varchar(255) NOT NULL,
                \`from_email\` varchar(255) NOT NULL,
                \`username\` varchar(255) NOT NULL,
                \`password\` varchar(255) NOT NULL,
                \`smtp_host\` varchar(255) NOT NULL,
                \`smtp_port\` int NOT NULL DEFAULT '587',
                \`smtp_encryption\` enum ('SSL', 'TLS', 'None') NOT NULL DEFAULT 'None',
                \`message_per_day\` int NOT NULL DEFAULT '200',
                \`min_time_gap\` int NULL,
                \`reply_to_email\` varchar(255) NULL,
                \`imap_host\` varchar(255) NULL,
                \`imap_port\` int NULL,
                \`imap_encryption\` enum ('SSL', 'TLS', 'None') NOT NULL DEFAULT 'None',
                \`use_different_email_for_imap\` tinyint NOT NULL DEFAULT 0,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE \`email_configurations\`
        `);
    }

}
