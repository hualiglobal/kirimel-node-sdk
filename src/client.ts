/**
 * KiriMel Node.js SDK Client
 */
import { HttpClient, HttpClientConfig } from './httpClient';
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

export interface ClientConfig extends Omit<HttpClientConfig, 'logger'> {
  logger?: any;
}

export class Client {
  private readonly httpClient: HttpClient;
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

  constructor(config: ClientConfig = {}) {
    this.httpClient = new HttpClient({
      apiKey: config.apiKey,
      baseUrl: config.baseUrl,
      timeout: config.timeout,
      retries: config.retries,
      logger: config.logger,
    });
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
}
