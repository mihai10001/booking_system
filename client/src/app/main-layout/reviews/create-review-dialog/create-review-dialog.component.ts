import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

import { ReviewsService } from '../reviews.service';
import { ReviewModel as Review } from '../../reviewModel';


@Component({
  selector: 'app-create-review-dialog',
  templateUrl: './create-review-dialog.component.html',
  styleUrls: ['./create-review-dialog.component.css']
})
export class CreateReviewDialogComponent implements OnInit {

  eventId: string;
  reviewForm: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateReviewDialogComponent>,
    private formBuilder: FormBuilder,
    private reviewsService: ReviewsService
  ) {
   }

  ngOnInit(): void {
    if (this.data.eventId)
      this.eventId = this.data.eventId;

    this.reviewForm = this.formBuilder.group({
      description: [''],
      rating: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.reviewForm.invalid || !this.eventId) {
      return;
    }
  
    this.createReview(this.eventId, this.reviewForm.value);
  }

  createReview(eventId: string, review: Review) {
    if (eventId)
      this.reviewsService.createReviewObservable(eventId, review)
        .subscribe(
          (data) => this.dialogRef.close('Created!')
        );
  }

  onRate(event: number) {
    this.reviewForm.controls.rating.setValue(event);
  }
}
