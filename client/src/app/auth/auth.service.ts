import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthentificated: boolean = false;

  get userIsAuthenticated() {
    return this._userIsAuthentificated;
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(email, password) {
    this.http
      .post<any>(environment.apiUrl + '/login', {email, password})
      .subscribe(
        (data) => {
          if (data) {
            sessionStorage.setItem('token', data.accessToken as string);
            this._userIsAuthentificated = true;
            this.router.navigateByUrl('/events/list');
          }
        },
        (error) => console.log(error)
      );
  }

  registerObservable(email, password, name) {
    return this.http.post<any>(environment.apiUrl + '/register', {email, password, name});
  }

  logout(){
    this._userIsAuthentificated = false;
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }
}
