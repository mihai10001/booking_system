import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarRatingModule } from '@sreyaj/ng-star-rating';

import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { MainLayoutComponent } from './main-layout.component';
import { EventsPage } from './events/events.page';
import { ManageEventsPage } from './manage-events/manage-events.page';
import { CreateBookingDialogComponent } from './events/create-booking-dialog/create-booking-dialog.component';
import { EditEventsPage } from './edit-events/edit-events.page';
import { AddEventsPage } from './add-events/add-events.page';
import { ManageTicketsComponent } from './manage-tickets/manage-tickets.component';
import { CreateEditTicketDialogComponent } from './manage-tickets/create-edit-ticket-dialog/create-edit-ticket-dialog.component';
import { BookingsPage } from './bookings/bookings.page';
import { MyAccountPage } from './my-account/my-account.page';
import { ReviewsPage } from './reviews/reviews.page';
import { CreateReviewDialogComponent } from './reviews/create-review-dialog/create-review-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MainLayoutRoutingModule,
    StarRatingModule
  ],
  declarations: [
    MainLayoutComponent,
    EventsPage,
    ManageEventsPage,
    CreateBookingDialogComponent,
    EditEventsPage,
    AddEventsPage,
    ManageTicketsComponent,
    CreateEditTicketDialogComponent,
    BookingsPage,
    MyAccountPage,
    ReviewsPage,
    CreateReviewDialogComponent
  ],
})
export class MainLayoutModule { }
