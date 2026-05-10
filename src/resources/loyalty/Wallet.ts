/**
 * Loyalty Wallet resource
 */
import { LoyaltyHttpClient } from '../../loyaltyHttpClient';

export class Wallet {
  constructor(private readonly httpClient: LoyaltyHttpClient) {}

  public async balance(data: {
    customer_id: string;
  }): Promise<any> {
    return this.httpClient.post('/api/loyalty/wallet/balance', data);
  }

  public async recalculate(data: {
    customer_id: string;
  }): Promise<any> {
    return this.httpClient.post('/api/loyalty/wallet/recalculate', data);
  }
}
