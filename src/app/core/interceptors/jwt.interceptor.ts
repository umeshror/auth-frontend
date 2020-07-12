import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../auth';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.access) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.access}`
        }
      });
    }

    return next.handle(request);
  }
}
