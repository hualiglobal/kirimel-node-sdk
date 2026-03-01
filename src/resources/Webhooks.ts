/**
 * Webhooks resource client
 */
import { HttpClient } from '../httpClient';

export class Webhooks {
  constructor(private readonly httpClient: HttpClient) {}

  public async list(params?: Record<string, any>): Promise<any> {
    return this.httpClient.get('webhooks', params);
  }

  public async get(id: number): Promise<any> {
    return this.httpClient.get(`webhooks/${id}`);
  }

  public async create(data: Record<string, any>): Promise<any> {
    return this.httpClient.post('webhooks', data);
  }

  public async update(id: number, data: Record<string, any>): Promise<any> {
    return this.httpClient.post(`webhooks/${id}`, data);
  }

  public async delete(id: number): Promise<any> {
    return this.httpClient.delete(`webhooks/${id}`);
  }

  public async test(id: number): Promise<any> {
    return this.httpClient.post(`webhooks/${id}/test`);
  }

  public async logs(id: number): Promise<any> {
    return this.httpClient.get(`webhooks/${id}/logs`);
  }

  public async events(): Promise<any> {
    return this.httpClient.get('webhooks/events');
  }

  public async regenerateSecret(id: number): Promise<any> {
    return this.httpClient.post(`webhooks/${id}/secret/regenerate`);
  }
}
