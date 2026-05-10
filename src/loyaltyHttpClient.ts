/**
 * Loyalty HTTP Client with HMAC SHA256 authentication
 */
import fetch, { Response } from 'node-fetch';
import { createHmac } from 'crypto';
import { ApiException, AuthenticationException } from './exceptions';

export interface LoyaltyHttpClientConfig {
  clientKey?: string;
  clientSecret?: string;
  baseUrl?: string;
  timeout?: number;
  retries?: number;
  logger?: any;
}

interface RequestOptions {
  method: string;
  headers: Record<string, string>;
  body?: string;
  timeout?: number;
}

export class LoyaltyHttpClient {
  private readonly baseUrl: string;
  private readonly clientKey: string;
  private readonly clientSecret: string;
  private readonly timeout: number;
  private readonly retries: number;
  private logger?: any;

  constructor(config: LoyaltyHttpClientConfig = {}) {
    this.baseUrl = (config.baseUrl || 'https://kirimel.com').replace(/\/$/, '');
    this.clientKey = config.clientKey || process.env.KIRIMEL_LOYALTY_CLIENT_KEY || '';
    this.clientSecret = config.clientSecret || process.env.KIRIMEL_LOYALTY_CLIENT_SECRET || '';
    this.timeout = config.timeout || 30000;
    this.retries = config.retries || 3;
    this.logger = config.logger;

    if (!this.clientKey || !this.clientSecret) {
      throw new AuthenticationException(
        'Loyalty API requires both client_key and client_secret. ' +
        'Set KIRIMEL_LOYALTY_CLIENT_KEY and KIRIMEL_LOYALTY_CLIENT_SECRET environment variables.',
        401
      );
    }
  }

  public async get(path: string, params?: Record<string, any>): Promise<any> {
    const url = this.buildUrl(path, params);
    return this.request('GET', url);
  }

  public async post(path: string, data?: Record<string, any>): Promise<any> {
    return this.request('POST', this.buildUrl(path), data);
  }

  public async put(path: string, data?: Record<string, any>): Promise<any> {
    return this.request('PUT', this.buildUrl(path), data);
  }

  public async delete(path: string): Promise<any> {
    return this.request('DELETE', this.buildUrl(path));
  }

  private buildUrl(path: string, params?: Record<string, any>): string {
    const cleanPath = path.replace(/^\//, '');
    let url = `${this.baseUrl}/${cleanPath}`;

    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      }
      url += `?${searchParams.toString()}`;
    }

    return url;
  }

  private async request(
    method: string,
    url: string,
    data?: Record<string, any>,
    attempt = 0
  ): Promise<any> {
    const timestamp = this.getTimestamp();
    const payload = data ? JSON.stringify(data) : '';
    const signature = this.calculateSignature(timestamp, payload);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'KiriMel-Node-SDK/2.0.0',
      'X-Client-Key': this.clientKey,
      'X-Timestamp': timestamp,
      'X-Signature': signature,
    };

    const options: RequestOptions = {
      method,
      headers,
      timeout: this.timeout,
    };

    if (data) {
      options.body = payload;
    }

    try {
      const response: Response = await fetch(url, options as any);

      if (response.status >= 400) {
        await this.handleError(response);
      }

      return await response.json();
    } catch (error: any) {
      // Network error - retry if attempts remain
      if (attempt < this.retries - 1 && !error.statusCode) {
        await this.sleep(100 * (attempt + 1)); // Exponential backoff
        return this.request(method, url, data, attempt + 1);
      }
      throw new ApiException(`Network error: ${error.message}`);
    }
  }

  private getTimestamp(): string {
    const now = new Date();
    return now.toISOString().replace(/\.\d+Z$/, 'Z');
  }

  private calculateSignature(timestamp: string, payload: string): string {
    const signingString = `${timestamp}.${payload}`;
    const signature = createHmac('sha256', this.clientSecret)
      .update(signingString)
      .digest('hex');
    return signature;
  }

  private async handleError(response: Response): Promise<void> {
    let message = 'API request failed';
    let errors: any;

    try {
      const data: any = await response.json();
      message = data.message || message;
      errors = data.errors;
    } catch {
      // Use default error message
    }

    if (response.status === 401) {
      throw new AuthenticationException(message, response.status, errors);
    }

    throw new ApiException(message, response.status, errors);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
