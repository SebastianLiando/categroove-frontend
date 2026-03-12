import {inject, Injectable} from '@angular/core';
import {CategrooveApiService} from './categroove-api-service';
import {firstValueFrom} from 'rxjs';
import {TokenResponse} from './model/token-response';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly apiService = inject(CategrooveApiService)
  private _accessTokenData: TokenResponse | null = null

  public get accessTokenData(): TokenResponse | null {
    return this._accessTokenData
  }

  private set accessTokenData(value: TokenResponse | null) {
    this._accessTokenData = value
  }

  getLoginUrl() {
    return firstValueFrom(this.apiService.login())
  }

  async login(code: string) {
    this.accessTokenData = await firstValueFrom(this.apiService.callback(code))
  }

  async refreshToken() {
    try {
      this.accessTokenData = await firstValueFrom(this.apiService.refreshToken())
    } catch (e) {
      this.accessTokenData = null
      throw e
    }
  }
}
