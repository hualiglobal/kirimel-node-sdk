/**
 * Email resource client for transactional emails
 */
import { HttpClient } from '../httpClient';

export class Email {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Send transactional email
   *
   * @param data Email data
   *   - to: string | string[] - Recipient email(s)
   *   - subject: string - Email subject
   *   - html: string - HTML content (optional)
   *   - text: string - Plain text content (optional)
   *   - from_email: string - Verified sender address (optional, per-send override)
   *   - from_name: string - From name (optional)
   *   - reply_to: string - Reply-to address (optional)
   *   - cc: string | string[] - CC recipients (optional)
   *   - bcc: string | string[] - BCC recipients (optional)
   *   - attachments: Array<{ name: string, content: string }> - Base64 attachments (optional)
   */
  public async send(data: Record<string, any>): Promise<any> {
    return this.httpClient.post('email/send', data);
  }

  /**
   * Get send quota
   */
  public async quota(): Promise<any> {
    return this.httpClient.get('email/quota');
  }

  /**
   * Get verified sender emails/domains
   */
  public async verified(): Promise<any> {
    return this.httpClient.get('email/verified');
  }

  /**
   * Verify an email address
   */
  public async verify(email: string): Promise<any> {
    return this.httpClient.post('email/verify', { email });
  }
}
