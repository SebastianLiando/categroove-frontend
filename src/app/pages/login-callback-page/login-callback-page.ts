import { Component, computed, inject, OnInit } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { Equalizer } from '../../equalizer/equalizer';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication-service';
import { Location } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login-callback-page',
  imports: [LottieComponent, Equalizer],
  templateUrl: './login-callback-page.html',
  styleUrl: './login-callback-page.css',
})
export class LoginCallbackPage implements OnInit {
  options: AnimationOptions = {
    path: '/spotify-lottie.json',
  };

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly authService = inject(AuthenticationService);

  private readonly queryParams = toSignal(this.activatedRoute.queryParams, {
    initialValue: { code: '' },
  });
  code = computed(() => this.queryParams()['code'] as string);

  private async process() {
    await this.authService.login(this.code());

    const redirectUrl = this.authService.redirectUrlAfterAuth ?? '/dashboard';
    await this.router.navigateByUrl(redirectUrl);
  }

  ngOnInit() {
    this.process().catch(() => this.location.back());
  }
}
