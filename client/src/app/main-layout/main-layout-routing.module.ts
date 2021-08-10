import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './main-layout.component';
import { EventsPage } from './events/events.page';
import { ManageEventsPage } from './manage-events/manage-events.page';
import { EditEventsPage } from './edit-events/edit-events.page';
import { AddEventsPage } from './add-events/add-events.page';
import { BookingsPage } from './bookings/bookings.page';
import { MyAccountPage } from './my-account/my-account.page';
import { ReviewsPage } from './reviews/reviews.page';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'events/list',
        component: EventsPage
      },
      {
        path: 'events/edit/:eventId',
        component: EditEventsPage
      },
      {
        path: 'events/add',
        component: AddEventsPage
      },
      {
        path: 'events/manage',
        component: ManageEventsPage
      },
      {
        path: 'events/reviews/:eventId',
        component: ReviewsPage
      },
      {
        path: 'bookings',
        component: BookingsPage
      },
      {
        path: 'profile',
        component: MyAccountPage
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
