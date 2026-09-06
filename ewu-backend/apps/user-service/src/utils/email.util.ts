import { MailerService } from '@nestjs-modules/mailer';

export const sendMail = (
  toEmail: string[],
  subject: string,
  body: string,
  mailService: MailerService,
  ccEmail?: string[],
  attachments?: any[],
) => {
  try {
    const message = body;
    // Convert file paths to proper attachment format
    const formattedAttachments = attachments
      ? attachments.map((attachment) => {
          if (typeof attachment === 'string') {
            // If it's a file path
            return {
              filename: attachment.split('/').pop() || 'attachment',
              path: attachment,
            };
          }
          return attachment;
        })
      : [];
    mailService.sendMail({
      to: toEmail,
      cc: ccEmail || [],
      subject: `${subject}`,
      html: message,
      attachments: formattedAttachments,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
