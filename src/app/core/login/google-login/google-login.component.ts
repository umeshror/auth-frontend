import {AfterViewInit, Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";

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

  public auth2: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.googleOnInit()
  }

  public googleOnInit(): void{
        gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSignIn,
      'onfailure': this.onFailure
    });
  }
  public onSignIn(googleUser): void {
    console.log('googleUser');
    console.log(googleUser);
    console.log(googleUser.getBasicProfile())
  }

  public onFailure(error): void {
    console.log(error);
  }
}

