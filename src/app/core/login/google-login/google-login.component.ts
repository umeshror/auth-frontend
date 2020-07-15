import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth";

declare const gapi: any;

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent implements OnInit, AfterViewInit {


  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.googleOnInit();
  }

  private googleOnInit(): void {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': param => this.onSignIn(param),
      'onfailure': this.onFailure
    });
  }

  private onSignIn(googleUser): void {
    const userProfile = googleUser.getBasicProfile();
    const data = {
      email: userProfile.getEmail(),
      first_name: userProfile.getGivenName(),
      last_name: userProfile.getFamilyName(),
      profile_picture_url: userProfile.getImageUrl(),
      token: userProfile.id_token,
    };
    this.authService.googleLogin(data);
  }

  public onFailure(error): void {
    console.log(error);
  }
}
