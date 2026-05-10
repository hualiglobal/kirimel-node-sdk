/**
 * KiriMel Node.js SDK Client
 */
import { HttpClient, HttpClientConfig } from './httpClient';
import { LoyaltyHttpClient } from './loyaltyHttpClient';
import { Campaigns } from './resources/Campaigns';
import { Subscribers } from './resources/Subscribers';
import { Lists } from './resources/Lists';
import { Segments } from './resources/Segments';
import { Templates } from './resources/Templates';
import { Forms } from './resources/Forms';
import { Conversions } from './resources/Conversions';
import { LandingPages } from './resources/LandingPages';
import { Workflows } from './resources/Workflows';
import { Webhooks } from './resources/Webhooks';
import { Customers } from './resources/loyalty/Customers';
import { Points } from './resources/loyalty/Points';
import { Vouchers } from './resources/loyalty/Vouchers';
import { Wallet } from './resources/loyalty/Wallet';

export interface ClientConfig extends HttpClientConfig {
  logger?: any;
  // Loyalty API credentials
  clientKey?: string;
  clientSecret?: string;
}

export class Client {
  private readonly httpClient: HttpClient;
  private readonly loyaltyBaseUrl: string;
  private readonly loyaltyClientKey?: string;
  private readonly loyaltyClientSecret?: string;
  private readonly timeout: number;
  private readonly retries: number;
  private logger?: any;

  // Email API resources
  private _campaigns?: Campaigns;
  private _subscribers?: Subscribers;
  private _lists?: Lists;
  private _segments?: Segments;
  private _templates?: Templates;
  private _forms?: Forms;
  private _conversions?: Conversions;
  private _landingPages?: LandingPages;
  private _workflows?: Workflows;
  private _webhooks?: Webhooks;

  // Loyalty API resources
  private _loyaltyHttpClient?: LoyaltyHttpClient;
  private _loyaltyCustomers?: Customers;
  private _loyaltyPoints?: Points;
  private _loyaltyVouchers?: Vouchers;
  private _loyaltyWallet?: Wallet;

  constructor(config: ClientConfig = {}) {
    this.httpClient = new HttpClient({
      apiKey: config.apiKey,
      baseUrl: config.baseUrl,
      timeout: config.timeout,
      retries: config.retries,
      logger: config.logger,
    });

    // Store loyalty config for lazy initialization
    this.loyaltyBaseUrl = (config.baseUrl || 'https://kirimel.com/api').replace('/api', '');
    this.loyaltyClientKey = config.clientKey || process.env.KIRIMEL_LOYALTY_CLIENT_KEY;
    this.loyaltyClientSecret = config.clientSecret || process.env.KIRIMEL_LOYALTY_CLIENT_SECRET;
    this.timeout = config.timeout || 30000;
    this.retries = config.retries || 3;
    this.logger = config.logger;
  }

  private initLoyaltyClient(): LoyaltyHttpClient {
    if (!this._loyaltyHttpClient) {
      this._loyaltyHttpClient = new LoyaltyHttpClient({
        clientKey: this.loyaltyClientKey,
        clientSecret: this.loyaltyClientSecret,
        baseUrl: this.loyaltyBaseUrl,
        timeout: this.timeout,
        retries: this.retries,
        logger: this.logger,
      });
    }
    return this._loyaltyHttpClient;
  }

  public get campaigns(): Campaigns {
    if (!this._campaigns) {
      this._campaigns = new Campaigns(this.httpClient);
    }
    return this._campaigns;
  }

  public get subscribers(): Subscribers {
    if (!this._subscribers) {
      this._subscribers = new Subscribers(this.httpClient);
    }
    return this._subscribers;
  }

  public get lists(): Lists {
    if (!this._lists) {
      this._lists = new Lists(this.httpClient);
    }
    return this._lists;
  }

  public get segments(): Segments {
    if (!this._segments) {
      this._segments = new Segments(this.httpClient);
    }
    return this._segments;
  }

  public get templates(): Templates {
    if (!this._templates) {
      this._templates = new Templates(this.httpClient);
    }
    return this._templates;
  }

  public get forms(): Forms {
    if (!this._forms) {
      this._forms = new Forms(this.httpClient);
    }
    return this._forms;
  }

  public get conversions(): Conversions {
    if (!this._conversions) {
      this._conversions = new Conversions(this.httpClient);
    }
    return this._conversions;
  }

  public get landingPages(): LandingPages {
    if (!this._landingPages) {
      this._landingPages = new LandingPages(this.httpClient);
    }
    return this._landingPages;
  }

  public get workflows(): Workflows {
    if (!this._workflows) {
      this._workflows = new Workflows(this.httpClient);
    }
    return this._workflows;
  }

  public get webhooks(): Webhooks {
    if (!this._webhooks) {
      this._webhooks = new Webhooks(this.httpClient);
    }
    return this._webhooks;
  }

  // Loyalty API resources

  public get loyaltyCustomers(): Customers {
    if (!this._loyaltyCustomers) {
      this._loyaltyCustomers = new Customers(this.initLoyaltyClient());
    }
    return this._loyaltyCustomers;
  }

  public get loyaltyPoints(): Points {
    if (!this._loyaltyPoints) {
      this._loyaltyPoints = new Points(this.initLoyaltyClient());
    }
    return this._loyaltyPoints;
  }

  public get loyaltyVouchers(): Vouchers {
    if (!this._loyaltyVouchers) {
      this._loyaltyVouchers = new Vouchers(this.initLoyaltyClient());
    }
    return this._loyaltyVouchers;
  }

  public get loyaltyWallet(): Wallet {
    if (!this._loyaltyWallet) {
      this._loyaltyWallet = new Wallet(this.initLoyaltyClient());
    }
    return this._loyaltyWallet;
  }
}
