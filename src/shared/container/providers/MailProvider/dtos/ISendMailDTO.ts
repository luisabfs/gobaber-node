import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailRecipient {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailRecipient;
  from?: IMailRecipient;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
