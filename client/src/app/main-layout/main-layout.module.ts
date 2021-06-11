import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarRatingModule } from '@sreyaj/ng-star-rating';
import { MainLayoutComponent } from './main-layout.component';
import { EventsPage } from './events/events.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    StarRatingModule
  ],
  declarations: [
    MainLayoutComponent,
    EventsPage,
  ],
})
export class MainLayoutModule { }
