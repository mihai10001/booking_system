import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(
    private http: HttpClient
  ) { }

  getBookingsObservable() {
    return this.http.get<any>(environment.apiUrl + '/bookings');
  }

  deleteBookingObservable(bookingId: string) {
    return this.http.delete<any>(environment.apiUrl + '/bookings/' + bookingId);
  }
}
