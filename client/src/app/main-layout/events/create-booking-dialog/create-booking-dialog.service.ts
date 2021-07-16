import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateBookingDialogService {

  constructor(
    private http: HttpClient,
  ) { }

  createBookingObservable(ticketId: string) {
    return this.http.post<any>(environment.apiUrl + '/bookings/' + ticketId, {});
  }

  getTicketsObservable(eventId: string) {
    return this.http.get<any>(environment.apiUrl + '/tickets/from_event/' + eventId);
  }
}
