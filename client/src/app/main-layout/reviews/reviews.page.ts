import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ReviewsService } from './reviews.service';
import { ReviewModel as Review } from '../reviewModel';
import { CreateReviewDialogComponent } from './create-review-dialog/create-review-dialog.component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.css']
})
export class ReviewsPage implements OnInit {

  eventId: string;
  eventTitle: string = '';
  reviews: Review[] = [];
  averageRating: number = 0;
  displayedColumns = [
    'description',
    'rating'
  ];
  isTableLoading: boolean = false;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private reviewsService: ReviewsService
    ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.eventId) {
        this.eventId = params.eventId;
        this.getReviews(this.eventId);
        this.getEventTitle(this.eventId);
      }
    });
  }

  getReviews(eventId: string) {
    this.isTableLoading = true;
    this.reviewsService.getReviewsObservable(eventId)
      .subscribe(
        (data) => {
          if (data) {
            this.reviews = data as Review[];
            this.averageRating = this.reviews.reduce((acc, element) => acc + element.rating, 0) / this.reviews.length;
          }
          this.isTableLoading = false;
        },
        (error) => {
          this.isTableLoading = false;
          console.log(error);
        }
      );
  }

  getEventTitle(eventId: string) {
    this.reviewsService.getEventObservable(eventId)
      .subscribe(
        (data) => this.eventTitle = data.title
      );
  }

  createReview() {
    if (this.eventId) {
      let dialogRef = this.dialog.open(CreateReviewDialogComponent, {
        data: {eventId: this.eventId},
        width: '500px',
        height: '460px'
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getReviews(this.eventId);
      });
    }
  }
}
