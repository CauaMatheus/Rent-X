import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

import { IMailProvider, ISendMail } from '../IMailProvider';

class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.client = transporter;
    }).catch((err) => console.error(err));
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

export { EtherealMailProvider };
