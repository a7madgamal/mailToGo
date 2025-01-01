const MAX_URL_LENGTH = 2000; // Maximum URL length supported by most browsers

export const calculateMailtoUrlLength = (
  recipients: string[],
  subject: string,
  body: string
): number => {
  const recipientsStr = recipients.join(',');
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  
  return `mailto:${recipientsStr}?subject=${encodedSubject}&body=${encodedBody}`.length;
};

export const validateUrlLength = (
  recipients: string[],
  subject: string,
  body: string
): string | null => {
  const urlLength = calculateMailtoUrlLength(recipients, subject, body);
  
  if (urlLength > MAX_URL_LENGTH) {
    const exceededBy = urlLength - MAX_URL_LENGTH;
    return `Email content is too long by ${exceededBy} characters. Please shorten your message.`;
  }
  
  return null;
};