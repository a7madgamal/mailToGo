const MAX_URL_LENGTH = 2000;

export const generateMailtoLink = (
  recipients: string[],
  subject: string,
  body: string
): string => {
  const recipientsStr = recipients.join(',');
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  
  const mailtoUrl = `mailto:${recipientsStr}?subject=${encodedSubject}&body=${encodedBody}`;
  
  if (mailtoUrl.length > MAX_URL_LENGTH) {
    throw new Error('Email content exceeds maximum URL length');
  }
  
  return mailtoUrl;
};