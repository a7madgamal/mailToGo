import React, {useState, useEffect} from "react";
import {X} from "lucide-react";
import styles from "./EmailForm.module.css";
import {validateForm} from "../../utils/validation";
import {generateMailtoLink} from "../../utils/mailtoGenerator";
import {getFormDataFromUrl, updateUrlWithFormData} from "../../utils/urlParams";
import type {EmailForm as EmailFormType} from "../../types/email";
import CampaignSelect from "../CampaignSelect/CampaignSelect";

export default function EmailForm() {
  const [formData, setFormData] = useState<EmailFormType>({
    subject: "",
    recipients: [],
    body: "",
  });
  const [recipientInput, setRecipientInput] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const urlData = getFormDataFromUrl();
    if (urlData.recipients?.length || urlData.subject || urlData.body) {
      setFormData((prev) => ({
        ...prev,
        ...urlData,
      }));
    }
  }, []);

  const handleCampaignSelect = (campaignData: EmailFormType) => {
    setFormData((prev) => {
      const newFormData = {
        ...prev,
        ...campaignData,
      };
      updateUrlWithFormData(newFormData);
      return newFormData;
    });
  };

  const handleRecipientKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const emails = recipientInput
        .split(",")
        .map((email) => email.trim())
        .filter((email) => email !== "");

      setFormData((prev) => {
        const newData = {
          ...prev,
          recipients: [...prev.recipients, ...emails],
        };
        updateUrlWithFormData(newData);
        return newData;
      });
      setRecipientInput("");
    }
  };

  const removeRecipient = (index: number) => {
    setFormData((prev) => {
      const newData = {
        ...prev,
        recipients: prev.recipients.filter((_, i) => i !== index),
      };
      updateUrlWithFormData(newData);
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    const validationErrors = validateForm(
      formData.subject,
      formData.recipients,
      formData.body
    );

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const mailtoLink = generateMailtoLink(
        formData.recipients,
        formData.subject,
        formData.body
      );
      window.location.href = mailtoLink;
    } catch (error) {
      if (error instanceof Error) {
        setErrors([error.message]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <CampaignSelect onSelect={handleCampaignSelect} />

      <div className={styles.inputGroup}>
        <label htmlFor="subject" className={styles.label}>
          Subject
        </label>
        <input
          id="subject"
          type="text"
          className={styles.input}
          value={formData.subject}
          onChange={(e) => {
            const newData = {...formData, subject: e.target.value};
            setFormData(newData);
            updateUrlWithFormData(newData);
          }}
          placeholder="Enter email subject"
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="recipients" className={styles.label}>
          Recipients
        </label>
        <input
          id="recipients"
          type="text"
          className={styles.input}
          value={recipientInput}
          onChange={(e) => setRecipientInput(e.target.value)}
          onKeyDown={handleRecipientKeyDown}
          placeholder="Type email and press Enter or comma to add"
        />
        <div className={styles.recipientTags}>
          {formData.recipients.map((recipient, index) => (
            <span key={index} className={styles.recipientTag}>
              {recipient}
              <X
                className={styles.removeButton}
                size={16}
                onClick={() => removeRecipient(index)}
              />
            </span>
          ))}
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="body" className={styles.label}>
          Body
        </label>
        <textarea
          id="body"
          className={styles.textarea}
          value={formData.body}
          onChange={(e) => {
            const newData = {...formData, body: e.target.value};
            setFormData(newData);
            updateUrlWithFormData(newData);
          }}
          placeholder="Compose your email message"
        />
      </div>

      {errors.length > 0 && (
        <div className="mb-4">
          {errors.map((error, index) => (
            <p key={index} className={styles.error}>
              {error}
            </p>
          ))}
        </div>
      )}

      <button type="submit" className={styles.sendButton} disabled={isLoading}>
        {isLoading ? (
          <>
            <svg className={styles.loadingSpinner} viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Sending...
          </>
        ) : (
          "Send Email"
        )}
      </button>
    </form>
  );
}
