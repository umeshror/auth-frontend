import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ForgotPassword, ResetPassword} from './forgot-password.interface';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) {
  }

  public forgotPassword(formData: ForgotPassword): Observable<string> {
    /*
    Used for generating OTP to reset the password
     */
    return this.http.post<string>(`${environment.apiUrl}/api/user/forgot-password/`, formData);
  }

  public resetPassword(formData: ResetPassword): Observable<string> {
    /*
    Used for validating OTP and resetting the password
    */
    return this.http.post<string>(`${environment.apiUrl}/api/user/reset-password/`, formData);
  }
}



