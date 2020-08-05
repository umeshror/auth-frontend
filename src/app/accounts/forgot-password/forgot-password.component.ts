import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../auth';
import {ActivatedRoute, Router} from '@angular/router';
import {ForgotPasswordService} from './services/forgot-password.service';
import {first} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  otpSent = false;
  hidePassword = true;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  codeControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private fpService: ForgotPasswordService,
    private snackBar: MatSnackBar
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    // stop here if form is invalid
    console.log(this.emailFormControl.value);
    if (this.emailFormControl.value.invalid) {
      return;
    }

    if (!this.otpSent) {
      this.forgotPassword();
    } else {
      if (this.codeControl.value.valid && this.passwordControl.value.invalid) {
        return;
      }
      this.resetPassword();
    }

  }

  private forgotPassword(): void {
    const formData = {
      email: this.emailFormControl.value
    };
    this.fpService.forgotPassword(formData)
      .pipe(first())
      .subscribe(
        data => {
          this.otpSent = true;
          this.emailFormControl.disable();
          console.log(data);
        },
        error => {
          this.otpSent = false;
        });
  }

  private resetPassword(): void {
    const formData = {
      email: this.emailFormControl.value,
      code: this.codeControl.value,
      new_password: this.passwordControl.value
    };
    console.log(formData);
    this.fpService.resetPassword(formData)
      .pipe(first())
      .subscribe(
        data => {
          this.snackBar.open('Password reset successfully!', 'Close', {
            duration: 5000,
          });
          this.router.navigate(['accounts/login']);
        },
        errorData => {
          if (errorData.error?.code) {
            this.codeControl.setErrors({
              serverError: errorData.error.code
            });
          }
          if (errorData.error?.new_password) {
            this.passwordControl.setErrors({
              serverError: errorData.error.new_password
            });
          }
        });
  }

}
