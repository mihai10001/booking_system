import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {

  constructor(
    private http: HttpClient
  ) { }

  getUserObservable() {
    return this.http.get<any>(environment.apiUrl + '/profile');
  }

  editUserObservable(name?: string, password?: string) {
    return this.http.put<any>(environment.apiUrl + '/profile',
      {
        ...name ? {name} : {},
        ...password ? {password} : {}
      }
    );
  }
}