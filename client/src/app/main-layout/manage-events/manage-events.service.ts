import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { EventModel } from '../eventModel';

@Injectable({
  providedIn: 'root'
})
export class ManageEventsService {

  constructor(
    private http: HttpClient
  ) { }

  getEventsObservable() {
    return this.http.get<any>(environment.apiUrl + '/events');
  }

  getEventObservable(eventId: string) {
    return this.http.get<any>(environment.apiUrl + '/events/' + eventId);
  }

  createEventObservable(event: EventModel) {
    return this.http.post<any>(environment.apiUrl + '/events', {...event});
  }

  editEventObservable(eventId: string, event: EventModel) {
    return this.http.put<any>(environment.apiUrl + '/events/' + eventId, {...event});
  }

  deleteEventObservable(eventId: string) {
    return this.http.delete<any>(environment.apiUrl + '/events/' + eventId);
  }
}
