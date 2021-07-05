import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EventModel } from '../eventModel';
import { ManageEventsService } from '../manage-events/manage-events.service';
import { romanianCities } from '../utils/romanianCities.json';
import { genreTypes } from '../utils/genreTypes.json';

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.page.html',
  styleUrls: ['./add-events.page.css']
})
export class AddEventsPage implements OnInit {

  addEventsForm: any;
  romanianCities: string[] = romanianCities;
  genreTypes: string[] = genreTypes;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private manageEventsService: ManageEventsService
  ) { }

  ngOnInit() {
    this.addEventsForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      city: ['', Validators.required],
      genre_type: ['', Validators.required],
      commission_percentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      image_url: [''],
      start_date: [new Date(), Validators.required],
      end_date: [new Date(), Validators.required],
    });
  }

  submitForm() {
    if (this.addEventsForm.invalid) {
      return;
    }

    this.manageEventsService
      .createEventObservable(this.addEventsForm.value as EventModel)
      .subscribe(
        (data) => {
          if (data.eventId)
            this.router.navigateByUrl('/events/edit/' + data.eventId);
          else
            this.router.navigateByUrl('/events/manage');
      });
  }
}
