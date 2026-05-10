/**
 * Loyalty Vouchers resource
 */
import { LoyaltyHttpClient } from '../../loyaltyHttpClient';

export class Vouchers {
  constructor(private readonly httpClient: LoyaltyHttpClient) {}

  public async createBatch(data: {
    name: string;
    type: 'PERCENT' | 'FIXED';
    value: number;
    quantity: number;
    valid_from: string;
    valid_until: string;
    min_purchase?: number;
    max_discount?: number;
  }): Promise<any> {
    return this.httpClient.post('/api/loyalty/vouchers/batches', data);
  }

  public async listBatches(params?: {
    page?: number;
    per_page?: number;
  }): Promise<any> {
    return this.httpClient.get('/api/loyalty/vouchers/batches', params);
  }

  public async issue(data: {
    voucher_batch_id: string;
    customer_id: string;
    delivered_via: 'email' | 'sms';
    reference_id?: string;
  }): Promise<any> {
    return this.httpClient.post('/api/loyalty/vouchers/issue', data);
  }

  public async redeem(data: {
    code: string;
    customer_id: string;
    purchase_amount: number;
    reference_id?: string;
  }): Promise<any> {
    return this.httpClient.post('/api/loyalty/vouchers/redeem', data);
  }

  public async get(code: string): Promise<any> {
    return this.httpClient.get(`/api/loyalty/vouchers/${code}`);
  }
}
