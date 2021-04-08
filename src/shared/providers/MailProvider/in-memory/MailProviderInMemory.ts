import { IMailProvider, ISendMail } from '../IMailProvider';

class MailProviderInMemory implements IMailProvider {
  private messages: ISendMail[] = []

  async sendMail({
    to, subject, variables, path,
  }: ISendMail): Promise<void> {
    this.messages.push({
      to, subject, variables, path,
    });
  }
}

export { MailProviderInMemory };
