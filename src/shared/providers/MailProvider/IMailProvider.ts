interface ISendMail {
  to: string,
  subject: string,
  variables: {
    name: string
    link: string
  }
  path: string
}

interface IMailProvider {
  sendMail({
    to, subject, variables, path,
  }: ISendMail): Promise<void>
}

export { IMailProvider, ISendMail };
