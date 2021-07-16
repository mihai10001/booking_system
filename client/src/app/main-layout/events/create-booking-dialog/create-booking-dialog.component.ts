import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CreateBookingDialogService } from './create-booking-dialog.service';
import { TicketModel as Ticket } from '../../ticketModel';

@Component({
  selector: 'app-create-booking-dialog',
  templateUrl: './create-booking-dialog.component.html',
  styleUrls: ['./create-booking-dialog.component.css']
})
export class CreateBookingDialogComponent implements OnInit {

  eventTitle: string = '';
  ticketsForEvent: any[] = [];
  selectedTicket: Ticket;
  bookingForm: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateBookingDialogComponent>,
    private formBuilder: FormBuilder,
    private createBookingService: CreateBookingDialogService
  ) {
   }

  ngOnInit(): void {
    this.bookingForm = this.formBuilder.group({
      ticketId: ['', [Validators.required]]
    })
  
    if (this.data.eventId)
      this.getTickets(this.data.eventId);
  }

  setTicket(ticketId: string) {
    if (Array.isArray(this.ticketsForEvent) && this.ticketsForEvent.length)
      this.selectedTicket = this.ticketsForEvent.find(ticket => ticket._id === ticketId);
  }

  getTickets(eventId: string) {
    if (eventId)
      this.createBookingService.getTicketsObservable(eventId)
        .subscribe(
          (data) => this.ticketsForEvent = data
        );
  }

  createBooking() {
    if (this.bookingForm.invalid)
      return;
    
    this.createBookingService.createBookingObservable(this.bookingForm.value.ticketId)
      .subscribe(
        (data) => this.dialogRef.close()
      );
  }
}
