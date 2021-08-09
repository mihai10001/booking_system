import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ManageTicketsService } from './manage-tickets.service';
import { TicketModel as Ticket } from '../ticketModel';
import { CreateEditTicketDialogComponent } from './create-edit-ticket-dialog/create-edit-ticket-dialog.component';

@Component({
  selector: 'app-manage-tickets',
  templateUrl: './manage-tickets.component.html',
  styleUrls: ['./manage-tickets.component.css']
})
export class ManageTicketsComponent implements OnInit {
  
  @Input() eventId: string = '';
  tickets: Ticket[] = [];
  displayedColumns = [
    'title',
    'description',
    'base_price',
    'available_tickets',
    'actions'
  ];
  isTableLoading: boolean = false;

  constructor(
    public dialog: MatDialog,
    private manageTicketsService: ManageTicketsService
  ) { }

  ngOnInit() {
    console.log(this.eventId);
    if (this.eventId)
      this.getTickets(this.eventId);
  }

  getTickets(eventId: string) {
    this.isTableLoading = true;
    this.manageTicketsService.getTicketsObservable(eventId)
      .subscribe(
        (data) => {
          if (data) {
            this.tickets = data as Ticket[];
          }
          this.isTableLoading = false;
        },
        (error) => {
          this.isTableLoading = false;
          console.log(error);
        }
      );
  }

  createTicket() {
    if (this.eventId) {
      let dialogRef = this.dialog.open(CreateEditTicketDialogComponent, {
        data: {eventId: this.eventId},
        width: '500px',
        height: '460px'
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getTickets(this.eventId);
      });
    }
  }

  editTicket(ticketId: string) {
    if (ticketId) {
      let dialogRef = this.dialog.open(CreateEditTicketDialogComponent, {
        data: {ticketId: ticketId},
        width: '500px',
        height: '460px'
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getTickets(this.eventId);
      });
    }
  }

  deleteTicket(ticketId: string) {
    if (ticketId) {
      this.manageTicketsService.deleteTicketObservable(ticketId)
        .subscribe(() => this.getTickets(this.eventId));
    }
  }
}
