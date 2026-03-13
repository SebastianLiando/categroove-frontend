import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TokenResponse} from './model/token-response';

@Injectable({
  providedIn: 'root',
})
export class CategrooveApiService {
  private readonly apiHost = environment.apiHost
  private readonly http = inject(HttpClient)

  login() {
    const url = `${this.apiHost}/auth/login`
    return this.http.get(url, {
      responseType: "text"
    })
  }

  callback(code: string) {
    const url = `${this.apiHost}/auth/callback`
    return this.http.get<TokenResponse>(url, {params: new HttpParams().set('code', code)})
  }

  refreshToken() {
    const url = `${this.apiHost}/auth/refresh`
    return this.http.post<TokenResponse>(url, undefined, {
      // Refresh token is stored as HTTP only cookie
      withCredentials: true
    })
  }
}
