import {Component, inject, signal} from '@angular/core';
import {Equalizer} from '../../equalizer/equalizer';
import {CardModule} from 'primeng/card';
import {Image} from 'primeng/image';
import {SpotifyWithTextIcon} from '../../icons/spotify-with-text-icon/spotify-with-text-icon';
import {Button} from 'primeng/button';
import {SpotifyIcon} from '../../icons/spotify-icon/spotify-icon';
import {AuthenticationService} from '../../services/authentication-service';

@Component({
  selector: 'app-login-page',
  imports: [
    Equalizer,
    CardModule,
    Image,
    SpotifyWithTextIcon,
    Button,
    SpotifyIcon
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
  host: {
    class: 'flex flex-col items-center justify-center h-lvh'
  }
})
export class LoginPage {
  private readonly LOGO_LIGHT = '/categroove-light.png'
  private readonly LOGO_DARK = '/categroove-dark.png'

  private readonly authService = inject(AuthenticationService)

  readonly loading = signal(false)

  private isDarkMode() {
    return globalThis.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  getLogoSrc() {
    return this.isDarkMode() ? this.LOGO_DARK : this.LOGO_LIGHT;
  }

  async navigateToSpotifyLogin() {
    this.loading.set(true)

    try {
      globalThis.location.href = await this.authService.getLoginUrl()
    } finally {
      this.loading.set(false)
    }
  }
}
