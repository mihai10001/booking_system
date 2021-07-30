import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

import { ManageTicketsService } from '../manage-tickets.service';
import { TicketModel as Ticket } from '../../ticketModel';


@Component({
  selector: 'app-create-edit-ticket-dialog',
  templateUrl: './create-edit-ticket-dialog.component.html',
  styleUrls: ['./create-edit-ticket-dialog.component.css']
})
export class CreateEditTicketDialogComponent implements OnInit {

  eventId: string;
  ticketId: string;
  createEditTicketForm: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateEditTicketDialogComponent>,
    private formBuilder: FormBuilder,
    private manageTicketsService: ManageTicketsService
  ) {
   }

  ngOnInit(): void {
    this.createEditTicketForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      base_price: ['', Validators.required],
      available_tickets: ['', Validators.required]
    });

    if (this.data.eventId)
      this.eventId = this.data.eventId;

    if (this.data.ticketId) {
      this.ticketId = this.data.ticketId;
      this.manageTicketsService.getTicketObservable(this.ticketId)
      .subscribe(data => {
        this.createEditTicketForm = this.formBuilder.group({
          title: [data.title || '', Validators.required],
          description: [data.description || '', Validators.required],
          base_price: [data.base_price || '', Validators.required],
          available_tickets: [data.available_tickets || '', Validators.required]
        });
      }
    )
    }
  }

  submitForm() {
    if (this.createEditTicketForm.invalid) {
      return;
    }

    if (this.ticketId)
      this.editTicket(this.ticketId, this.createEditTicketForm.value);
    else if (this.eventId)
      this.createTicket(this.eventId, this.createEditTicketForm.value);
  }

  createTicket(eventId: string, ticket: Ticket) {
    if (eventId)
      this.manageTicketsService.createTicketObservable(eventId, ticket)
        .subscribe(
          (data) => this.dialogRef.close('Created!')
        );
  }

  editTicket(ticketId: string, ticket: Ticket) {
    if (ticketId)
      this.manageTicketsService.editTicketObservable(ticketId, ticket)
        .subscribe(
          (data) => this.dialogRef.close('Edited!')
        );
  }
}
