import { SES } from 'aws-sdk';
import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

import { IMailProvider, ISendMail } from '../IMailProvider';

class SESMailProvider implements IMailProvider {
  private client: Transporter

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_SES_REGION,
      }),
    });
  }

  async sendMail({
    to, subject, variables, path,
  }: ISendMail): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');
    const templateParse = handlebars.compile(templateFileContent);
    const templateHTML = templateParse(variables);

    const sendEmail = await this.client.sendMail({
      to,
      subject,
      html: templateHTML,
    });

    console.log('Message sent: %s', sendEmail.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(sendEmail));
  }
}

export { SESMailProvider };
