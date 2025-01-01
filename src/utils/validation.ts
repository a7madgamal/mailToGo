import { validateUrlLength } from './urlValidation';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const validateRecipients = (recipients: string[]): string[] => {
  if (!Array.isArray(recipients) || recipients.length === 0) {
    return ['At least one recipient is required'];
  }

  const errors: string[] = [];
  const validRecipients = recipients.filter(email => email.trim() !== '');
  
  if (validRecipients.length === 0) {
    return ['At least one recipient is required'];
  }

  validRecipients.forEach(email => {
    if (!validateEmail(email)) {
      errors.push(`Invalid email format: ${email}`);
    }
  });
  
  return errors;
};

export const validateForm = (subject: string, recipients: string[], body: string): string[] => {
  const errors: string[] = [];
  
  if (subject.trim().length === 0) {
    errors.push('Subject is required');
  }
  
  const recipientErrors = validateRecipients(recipients);
  errors.push(...recipientErrors);
  
  if (body.trim().length === 0) {
    errors.push('Email body is required');
  }

  const urlLengthError = validateUrlLength(recipients, subject, body);
  if (urlLengthError) {
    errors.push(urlLengthError);
  }
  
  return errors;
};