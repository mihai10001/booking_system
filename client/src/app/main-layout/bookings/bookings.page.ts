import { Component, OnInit } from '@angular/core';

import { BookingsService } from './bookings.service';
// import { EventModel as Event } from '../eventModel';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.css']
})
export class BookingsPage implements OnInit {

  bookings: any[] = [];
  displayedColumns = [
    'event_image_url',
    'event_title',
    'ticket_title',
    'ticket_description',
    'ticket_final_price',
    'status',
    'actions'
  ];
  isTableLoading: boolean = false;

  constructor(private bookingsService: BookingsService) {}

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings() {
    this.isTableLoading = true;
    this.bookingsService.getBookingsObservable()
      .subscribe(
        (data) => {
          if (data) {
            this.bookings = data as any[];
          }
          this.isTableLoading = false;
        },
        (error) => {
          this.isTableLoading = false;
          console.log(error);
        }
      );
  }

  deleteBooking(bookingId: string) {
    this.bookingsService.deleteBookingObservable(bookingId)
      .subscribe(() => this.getBookings())
  }
}
