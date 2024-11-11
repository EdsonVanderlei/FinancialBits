import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';

export abstract class BaseService {
  protected http = inject(HttpClient);

  private _baseUrl = environment.apiUrl;
  protected abstract baseEndpoint: string;

  protected get baseUrl() {
    return `${this._baseUrl}${this.baseEndpoint}`;
  }
}
