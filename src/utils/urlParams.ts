import { EmailForm } from '../types/email';

export const getFormDataFromUrl = (): Partial<EmailForm> => {
  const params = new URLSearchParams(window.location.search);
  
  const recipients = params.get('to')?.split(',').filter(Boolean) || [];
  const subject = params.get('subject') || '';
  const body = params.get('body') || '';
  
  return {
    recipients,
    subject,
    body
  };
};

export const updateUrlWithFormData = (formData: EmailForm): void => {
  const params = new URLSearchParams();
  
  if (formData.recipients.length > 0) {
    params.set('to', formData.recipients.join(','));
  }
  if (formData.subject) {
    params.set('subject', formData.subject);
  }
  if (formData.body) {
    params.set('body', formData.body);
  }
  
  const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
  window.history.replaceState({}, '', newUrl);
};