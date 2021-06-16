import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { EventModel as Event } from '../eventModel';
import { ManageEventsService } from './manage-events.service';
import { romanianCities } from '../utils/romanianCities.json';
import { genreTypes } from '../utils/genreTypes.json';

@Component({
  selector: 'app-manage-events',
  templateUrl: './manage-events.page.html',
  styleUrls: ['./manage-events.page.css']
})
export class ManageEventsPage implements OnInit {
  
  events: Event[] = [];
  filteredEvents: Event[] = [];
  filterEventsForm: any;
  displayedColumns = [
    'image_url',
    'title',
    'description',
    'city',
    'genre_type',
    'start_date',
    'end_date',
    'commission_percentage',
    'actions'
  ];
  isTableLoading: boolean = false;
  romanianCities: string[] = romanianCities;
  genreTypes: string[] = genreTypes;

  constructor(
    private formBuilder: FormBuilder,
    private manageEventsService: ManageEventsService
  ) { }

  ngOnInit() {
    this.getEvents();
    this.filterEventsForm = this.formBuilder.group({
      search: [''],
      city: [''],
      genre_type: [''],
      date: ['']
    });

    this.filterEventsForm.valueChanges.subscribe((value) =>
      this.applyFilter(value)
    );
  }

  getEvents() {
    this.isTableLoading = true;
    this.manageEventsService.getEventsObservable()
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

  deleteEvent(eventId: string) {
    this.manageEventsService.deleteEventObservable(eventId)
      .subscribe(() => this.getEvents())
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
