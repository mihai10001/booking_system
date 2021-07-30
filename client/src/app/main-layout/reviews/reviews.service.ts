import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { ReviewModel } from '../reviewModel';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(
    private http: HttpClient
  ) { }

  getReviewsObservable(eventId: string) {
    return this.http.get<any>(environment.apiUrl + '/reviews/' + eventId);
  }

  createReviewObservable(eventId: string, review: ReviewModel) {
    return this.http.post<any>(environment.apiUrl + '/reviews/' + eventId, {...review});
  }

  getEventObservable(eventId: string) {
    return this.http.get<any>(environment.apiUrl + '/events/' + eventId);
  }
}
