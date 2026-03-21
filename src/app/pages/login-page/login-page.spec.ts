import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginPage} from './login-page';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';


describe('LoginPage', () => {
  let fixture: ComponentFixture<LoginPage>;
  let httpTesting: HttpTestingController

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
      .compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(LoginPage);
    await fixture.whenStable();
  });

  const triggerLoginResponseAndWaitForChange = async (method: string, body: string, fail = false) => {
    const req = httpTesting.expectOne(req => req.url.includes('/auth/login'))
    expect(req.request.method).toBe(method)

    if (fail) {
      req.flush(body, {status: 500, statusText: 'Mock Error'})
    } else {
      req.flush(body)
    }

    await fixture.whenStable()
    fixture.detectChanges()
  }

  it('click login to Spotify should redirect to Spotify login page', async () => {
    const spotifyLoginUrl = "https://auth.spotify.com"

    const loginButton = fixture.nativeElement.querySelector('.p-button') as HTMLElement
    expect(loginButton).not.toBeNull()

    loginButton.click()
    await fixture.whenStable()

    const loadingButton = fixture.nativeElement.querySelector('.p-button') as HTMLElement
    expect(loadingButton.textContent).toBe('Redirecting to Spotify...')

    await triggerLoginResponseAndWaitForChange('GET', spotifyLoginUrl)

    expect(globalThis.location.href).toBe(spotifyLoginUrl)

    httpTesting.verify()
  })

  it('click login to Spotify but request fails should clear loading and stay in the same page', async () => {
    let loginButton = fixture.nativeElement.querySelector('.p-button') as HTMLElement
    expect(loginButton.textContent).toBe('Spotify icon Continue with Spotify ')

    loginButton.click()
    await fixture.whenStable()

    const loadingButton = fixture.nativeElement.querySelector('.p-button') as HTMLElement
    expect(loadingButton.textContent).toBe('Redirecting to Spotify...')

    await triggerLoginResponseAndWaitForChange('GET', 'Fail', true)

    loginButton = fixture.nativeElement.querySelector('.p-button') as HTMLElement
    expect(loginButton.textContent).toBe('Spotify icon Continue with Spotify ')

    expect(globalThis.location.href).toBe('http://localhost:4200')

    httpTesting.verify()
  })
});
