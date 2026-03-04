/**
 * Lists resource client
 */
import { HttpClient } from '../httpClient';

export class Lists {
  constructor(private readonly httpClient: HttpClient) {}

  public async list(params?: Record<string, any>): Promise<any> {
    return this.httpClient.get('lists', params);
  }

  public async get(id: number): Promise<any> {
    return this.httpClient.get(`lists/${id}`);
  }

  public async create(data: Record<string, any>): Promise<any> {
    return this.httpClient.post('lists', data);
  }

  public async update(id: number, data: Record<string, any>): Promise<any> {
    return this.httpClient.post(`lists/${id}`, data);
  }

  public async delete(id: number): Promise<any> {
    return this.httpClient.delete(`lists/${id}`);
  }

  public async stats(id: number): Promise<any> {
    return this.httpClient.get(`lists/${id}/stats`);
  }
}
