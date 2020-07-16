import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthService} from '../auth';
import {UserService} from './user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    let MOBILE_PATTERN = /[0-9\+\-\ ]/;

    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: [''],
      email: ['', [Validators.email, Validators.required]],
      phone_number: ['', [Validators.pattern(MOBILE_PATTERN)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.registerForm.controls;
  }

  public onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/login'], {queryParams: {registered: true}});
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
