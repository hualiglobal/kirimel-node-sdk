/**
 * Loyalty Points resource
 */
import { LoyaltyHttpClient } from '../../loyaltyHttpClient';

export class Points {
  constructor(private readonly httpClient: LoyaltyHttpClient) {}

  public async earn(data: {
    customer_id: string;
    points: number;
    amount?: number;
    reference_id?: string;
    description?: string;
  }): Promise<any> {
    return this.httpClient.post('/api/loyalty/points/earn', data);
  }

  public async previewRedeem(data: {
    customer_id: string;
    points_to_redeem: number;
  }): Promise<any> {
    return this.httpClient.post('/api/loyalty/points/preview-redeem', data);
  }

  public async commitRedeem(data: {
    customer_id: string;
    points_to_redeem: number;
    reference_id?: string;
  }): Promise<any> {
    return this.httpClient.post('/api/loyalty/points/redeem', data);
  }

  public async reverse(data: {
    transaction_id: string;
    reason: string;
    reference_id?: string;
  }): Promise<any> {
    return this.httpClient.post('/api/loyalty/points/reverse', data);
  }
}
