/**
 * Email resource client for transactional emails
 */
import { HttpClient } from '../httpClient';

export class Email {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Send transactional email
   * @param data Email data
   *   - to: string | string[] - Recipient email(s)
   *   - subject: string - Email subject
   *   - html?: string - HTML content
   *   - text?: string - Plain text content
   *   - from_name?: string - From name
   *   - reply_to?: string - Reply-to address
   *   - cc?: string | string[] - CC recipients
   *   - bcc?: string | string[] - BCC recipients
   *   - attachments?: Array<{name: string, content: string}> - Attachments (base64)
   * @returns Response with message_id and tracking_id
   */
  public async send(data: {
    to: string | string[];
    subject: string;
    html?: string;
    text?: string;
    from_name?: string;
    reply_to?: string;
    cc?: string | string[];
    bcc?: string | string[];
    attachments?: Array<{ name: string; content: string }>;
  }): Promise<any> {
    return this.httpClient.post('email/send', data);
  }

  /**
   * Get SES send quota
   * @returns Quota information
   *   - max_24_hour_send: number
   *   - sent_last_24_hours: number
   *   - remaining: number
   *   - max_send_rate_per_second: number
   *   - utilization_percent: number
   */
  public async quota(): Promise<any> {
    return this.httpClient.get('email/quota');
  }

  /**
   * Get verified emails
   * @returns List of verified email addresses
   */
  public async verifiedEmails(): Promise<any> {
    return this.httpClient.get('email/verified');
  }

  /**
   * Verify email address
   * @param email Email address to verify
   * @returns Verification status
   */
  public async verifyEmail(email: string): Promise<any> {
    return this.httpClient.post('email/verify', { email });
  }
}
