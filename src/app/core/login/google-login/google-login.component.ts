import {AfterViewInit, Component, NgZone, OnInit} from '@angular/core';
import {AuthService} from "../../auth";
import {GoogleUser} from "../../auth/models/user.model";
import {ActivatedRoute, Router} from "@angular/router";

declare const gapi: any;

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent implements OnInit, AfterViewInit {

  loading = false;
  returnUrl: string;
  error: string;
  success: string;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private ngZone: NgZone,
              private router: Router) {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
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
      token: userProfile.getId(),
    };
    this.googleLogin(data);
  }

  private googleLogin(data: GoogleUser): void {
    this.error = null;
    this.success = null;
    this.loading = true;
    this.ngZone.run(() => {
        this.authService.googleLogin(data)
          .subscribe(
            data => {
              this.router.navigate([this.returnUrl]);

            },
            data => {
              this.error = data;
              this.loading = false;
            }
          );
      }
    );
  }


  public onFailure(error): void {
    console.log(error);
  }
}
