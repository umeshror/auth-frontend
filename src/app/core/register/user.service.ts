import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../auth/models/user.model';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {
  }

  public register(user): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/api/user-create/`, user);
  }

}
