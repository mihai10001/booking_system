import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { EventModel } from '../eventModel';
import { ManageEventsService } from '../manage-events/manage-events.service';
import { romanianCities } from '../utils/romanianCities.json';
import { genreTypes } from '../utils/genreTypes.json';

@Component({
  selector: 'app-edit-events',
  templateUrl: './edit-events.page.html',
  styleUrls: ['./edit-events.page.css']
})
export class EditEventsPage implements OnInit {

  eventId: string;
  editEventsForm: any;
  romanianCities: string[] = romanianCities;
  genreTypes: string[] = genreTypes;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private manageEventsService: ManageEventsService
  ) { }

  ngOnInit() {

    this.editEventsForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      city: ['', Validators.required],
      genre_type: ['', Validators.required],
      commission_percentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      image_url: [''],
      start_date: [new Date(), Validators.required],
      end_date: [new Date(), Validators.required],
    });

    this.route.params.subscribe(params => {
      if (params.eventId)
        this.eventId = params.eventId;
        this.manageEventsService.getEventObservable(this.eventId)
          .subscribe(data => {
            this.editEventsForm = this.formBuilder.group({
              title: [data.title || '', Validators.required],
              description: [data.description || '', Validators.required],
              city: [data.city || '', Validators.required],
              genre_type: [data.genre_type || '', Validators.required],
              commission_percentage: [data.commission_percentage || '', [Validators.required, Validators.min(0), Validators.max(100)]],
              image_url: [data.image_url || ''],
              start_date: [new Date(data.start_date) || new Date(), Validators.required],
              end_date: [new Date(data.end_date) || new Date(), Validators.required],
            });
          }
        )
    });
  }

  submitForm() {
    if (this.editEventsForm.invalid || !this.eventId) {
      return;
    }

    this.manageEventsService
      .editEventObservable(this.eventId, this.editEventsForm.value as EventModel)
      .subscribe(
        () => this.router.navigateByUrl('/events/manage')
      );
  }
}
