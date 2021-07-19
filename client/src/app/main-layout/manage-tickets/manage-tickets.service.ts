import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { TicketModel } from '../ticketModel';

@Injectable({
  providedIn: 'root'
})
export class ManageTicketsService {

  constructor(
    private http: HttpClient
  ) { }

  getTicketsObservable(eventId: string) {
    return this.http.get<any>(environment.apiUrl + '/tickets/from_event/' + eventId);
  }

  getTicketObservable(ticketId: string) {
    return this.http.get<any>(environment.apiUrl + '/tickets/' + ticketId);
  }

  createTicketObservable(eventId: string, ticket: TicketModel) {
    return this.http.post<any>(environment.apiUrl + '/tickets/from_event/' + eventId, {...ticket});
  }

  editTicketObservable(ticketId: string, ticket: TicketModel) {
    return this.http.put<any>(environment.apiUrl + '/tickets/' + ticketId, {...ticket});
  }

  deleteTicketObservable(ticketId: string) {
    return this.http.delete<any>(environment.apiUrl + '/tickets/' + ticketId);
  }
}
