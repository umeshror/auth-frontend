import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {User, GoogleUser} from './models/user.model';
import {MatSnackBar} from '@angular/material/snack-bar';

declare const gapi: any;

@Injectable({providedIn: 'root'})
export class AuthService {
  // keeps hold of the current value and emits it to any new subscribers as soon as they subscribe
  private currentUserSubject: BehaviorSubject<any>;
  // to be notified of changes, and notifications are sent when the this.currentUserSubject.next()
  // method is called in the login() and logout() methods

  public currentUser: Observable<any>;

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar
  ) {
    const sessionUser = JSON.parse(localStorage.getItem('currentUser'));

    this.currentUserSubject = new BehaviorSubject<any>(sessionUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get isLoggedIn(): boolean {
    const currentUser = this.currentUserValue;
    return !!(currentUser && currentUser.access !== null && currentUser.refresh);
  }

  public login(email, password): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/jwt/token/`, {email, password})
      .pipe(map(user => {
        return this.addUserSession(user);
      }));
  }


  public googleLogin(data: GoogleUser): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/api/google-auth/`, data)
      .pipe(map(user => {
        return this.addUserSession(user);
      }));
  }

  private addUserSession(user: User): User {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.showSnackbar('Logged in successfully!');
    return user;
  }

  private showSnackbar(message, duration = 5000): void {
    this.snackBar.open(
      message,
      'Close',
      {
        duration,
      });
  }


  public logout(): void {
    this.googleLogout();
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.showSnackbar('Logged out successfully!');
  }


  public googleLogout(): void {
    // @ts-ignore
    const auth2 = gapi.auth2;
    if (auth2 !== undefined) {
      // @ts-ignore
      const authInstance = auth2.getAuthInstance();
      authInstance.signOut();
    }
  }

  handleLoginCallback(): void {

  }
}
