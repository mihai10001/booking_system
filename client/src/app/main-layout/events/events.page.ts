import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { EventsService } from '../events/events.service';
import { EventModel as Event } from '../eventModel';
import { CreateBookingDialogComponent } from './create-booking-dialog/create-booking-dialog.component';
import { romanianCities } from '../utils/romanianCities.json';
import { genreTypes } from '../utils/genreTypes.json';


@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.css']
})
export class EventsPage implements OnInit {

  events: Event[] = [];
  filteredEvents: Event[] = [];
  filterEventsForm: any;
  isTableLoading = false;
  romanianCities: string[] = romanianCities;
  genreTypes: string[] = genreTypes;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private eventsService: EventsService
    ) { }

  ngOnInit() {
    this.getEvents();
    this.filterEventsForm = this.formBuilder.group({
      search: [''],
      city: [''],
      genre_type: [''],
      date: ['']
    });

    this.filterEventsForm.valueChanges.subscribe(
      (value) => this.applyFilter(value)
    );
  }

  getEvents() {
    this.isTableLoading = true;
    this.eventsService.getEventsObservable()
      .subscribe(
        (data) => {
          if (data) {
            this.events = data as Event[];
            this.filteredEvents = this.events;
          }
          this.isTableLoading = false;
        },
        (error) => {
          this.isTableLoading = false;
          console.log(error);
        }
      );
  }

  openDialog(eventId: string, eventTitle: string) {
    let dialogRef = this.dialog.open(CreateBookingDialogComponent, {
      panelClass: 'my-dialog-container',
      data: {eventId, eventTitle},
      width: '500px',
      height: '460px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getEvents();
      console.log('Created!');
    });
  }

  applyFilter(value) {
    this.filteredEvents = this.events;

    if (value.date) {
      let selectedDate = new Date(value.date).setHours(0,0,0,0);
      this.filteredEvents = this.filteredEvents.filter(event => 
        new Date(event.start_date).setHours(0,0,0,0) <= selectedDate && selectedDate <= new Date(event.end_date).setHours(0,0,0,0));
    } if (value.city)
      this.filteredEvents = this.filteredEvents.filter(event => event.city === value.city);
    if (value.genre_type)
      this.filteredEvents = this.filteredEvents.filter(event => event.genre_type === value.genre_type);
    if (value.search)
      this.filteredEvents = this.filteredEvents.filter(event =>
        event.title.toLowerCase().indexOf(value.search.toLowerCase()) > -1 ||
        event.description.toLowerCase().indexOf(value.search.toLowerCase()) > -1
      );
  }

  resetFilter() {
    this.filterEventsForm.reset();
    this.filteredEvents = this.events;
  }
}
