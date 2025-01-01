export interface EmailForm {
  subject: string;
  recipients: string[];
  body: string;
}

export interface Campaign {
  label: string;
  subject: string;
  emails: string;
  body: string;
}

export interface ValidationError {
  field: keyof EmailForm;
  message: string;
}
