/**
 * Subscribers resource client
 */
import { HttpClient } from '../httpClient';

export class Subscribers {
  constructor(private readonly httpClient: HttpClient) {}

  public async list(listId: number, params?: Record<string, any>): Promise<any> {
    return this.httpClient.get(`lists/${listId}/subscribers`, params);
  }

  public async listAll(params?: Record<string, any>): Promise<any> {
    return this.httpClient.get('subscribers', params);
  }

  public async get(id: number): Promise<any> {
    return this.httpClient.get(`subscribers/${id}`);
  }

  public async create(data: Record<string, any>): Promise<any> {
    return this.httpClient.post('subscribers', data);
  }

  public async update(id: number, data: Record<string, any>): Promise<any> {
    return this.httpClient.post(`subscribers/${id}`, data);
  }

  public async delete(id: number): Promise<any> {
    return this.httpClient.delete(`subscribers/${id}`);
  }

  public async unsubscribe(id: number): Promise<any> {
    return this.httpClient.post(`subscribers/${id}/unsubscribe`);
  }

  public async bulkUnsubscribe(subscriberIds: number[]): Promise<any> {
    return this.httpClient.post('subscribers/bulk-unsubscribe', { subscriber_ids: subscriberIds });
  }

  public async bulkDelete(subscriberIds: number[]): Promise<any> {
    return this.httpClient.post('subscribers/bulk-delete', { subscriber_ids: subscriberIds });
  }

  public async activity(id: number): Promise<any> {
    return this.httpClient.get(`subscribers/${id}/activity`);
  }

  public async stats(id: number): Promise<any> {
    return this.httpClient.get(`subscribers/${id}/stats`);
  }

  public async toggleVip(id: number): Promise<any> {
    return this.httpClient.post(`subscribers/${id}/toggle-vip`);
  }

  public async search(query: string): Promise<any> {
    return this.httpClient.get('subscribers/search', { q: query });
  }

  public async addTag(id: number, tag: string): Promise<any> {
    return this.httpClient.post(`subscribers/${id}/tags`, { tag });
  }

  public async removeTag(id: number, tag: string): Promise<any> {
    return this.httpClient.post(`subscribers/${id}/tags/${tag}/remove`);
  }

  public async import(listId: number, data: Record<string, any>): Promise<any> {
    return this.httpClient.post(`lists/${listId}/subscribers/import`, data);
  }
}
