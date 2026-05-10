/**
 * Loyalty Customers resource
 */
import { LoyaltyHttpClient } from '../../loyaltyHttpClient';

export class Customers {
  constructor(private readonly httpClient: LoyaltyHttpClient) {}

  public async register(data: {
    phone: string;
    name: string;
    email?: string;
    birth_date?: string;
    qr_code?: string;
  }): Promise<any> {
    return this.httpClient.post('/api/loyalty/customers/register', data);
  }

  public async lookup(data: {
    phone: string;
  }): Promise<any> {
    return this.httpClient.post('/api/loyalty/customers/lookup', data);
  }

  public async lookupByEmail(email: string): Promise<any> {
    return this.httpClient.get('/api/loyalty/customers/lookup-by-email', { email });
  }

  public async get(customerId: string): Promise<any> {
    return this.httpClient.get(`/api/loyalty/customers/${customerId}`);
  }

  public async transactions(customerId: string, params?: {
    page?: number;
    per_page?: number;
  }): Promise<any> {
    return this.httpClient.get(`/api/loyalty/customers/${customerId}/transactions`, params);
  }

  public async adjust(customerId: string, data: {
    points: number;
    reference: string;
    description: string;
    adjusted_by: string;
  }): Promise<any> {
    return this.httpClient.post(`/api/loyalty/customers/${customerId}/adjust`, data);
  }

  public async tier(customerId: string): Promise<any> {
    return this.httpClient.get(`/api/loyalty/customers/${customerId}/tier`);
  }

  public async list(params?: {
    page?: number;
    per_page?: number;
    tier?: string;
  }): Promise<any> {
    return this.httpClient.get('/api/loyalty/customers', params);
  }
}
