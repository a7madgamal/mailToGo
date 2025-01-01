import React from "react";
import {EmailForm} from "../../types/email";
import {CAMPAIGNS} from "../../data/campaigns";
import styles from "./CampaignSelect.module.css";

interface CampaignSelectProps {
  onSelect: (formData: EmailForm) => void;
}

export default function CampaignSelect({onSelect}: CampaignSelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const campaignLabel = e.target.value;
    if (!campaignLabel) return;

    const campaign = CAMPAIGNS.find((c) => c.label === campaignLabel);
    if (!campaign) return;

    onSelect({
      subject: campaign.subject,
      recipients: campaign.emails.split(",").map((email) => email.trim()),
      body: campaign.body,
    });
  };

  return (
    <div>
      <label htmlFor="campaign" className={styles.label}>
        Select Campaign (Optional)
      </label>
      <select
        id="campaign"
        className={styles.select}
        onChange={handleChange}
        defaultValue=""
      >
        <option value="">Choose a campaign...</option>
        {CAMPAIGNS.map((campaign) => (
          <option key={campaign.label} value={campaign.label}>
            {campaign.label}
          </option>
        ))}
      </select>
    </div>
  );
}
