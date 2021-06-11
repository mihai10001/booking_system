import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarRatingModule } from '@sreyaj/ng-star-rating';

import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { MainLayoutComponent } from './main-layout.component';
import { EventsPage } from './events/events.page';

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
  ],
})
export class MainLayoutModule { }
