import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {AuthService} from "../../auth";
import {environment} from "../../../../environments/environment";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

declare const gapi: any;

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent implements OnInit, AfterViewInit {

  private clientId: string = environment.CLIENT_ID;
  private scope = [
    'profile',
    'email'
  ].join(' ');

  private googleLogoURL = "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";
  public auth2: any;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private element: ElementRef,
    private authService: AuthService
  ) {
    this.matIconRegistry.addSvgIcon('logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.googleLogoURL));
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }


  public googleInit(): void {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
        cookiepolicy: 'single_host_origin',
        scope: this.scope
      });
      this.attachSignin(this.element.nativeElement.firstChild);
    });
  }

  public attachSignin(element): void {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log(profile);
        // ...
      }, error => {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }
}

