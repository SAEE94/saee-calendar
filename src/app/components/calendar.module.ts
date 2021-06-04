import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CalendarContainerComponent } from "./calendar-container/calendar-container.component";
import { DayComponent } from "./day/day.component";
import { CalendarService } from "./service/calendar.service";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CalendarComponent } from "./calendar/calendar.component";
import { EventListComponent } from "./event-list/event-list.component";
import {
  NgbModalModule,
  NgbDatepickerModule,
} from "@ng-bootstrap/ng-bootstrap";
import { EventFormComponent } from "./event-form/event-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { ColorPickerModule } from "ngx-color-picker";
import { StoreModule } from "@ngrx/store";
import { eventReducer } from "./redux/calendar.reducer";
import { eventConfigReducer } from './redux/calendar-config.reducer';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    NgbModalModule,
    NgbDatepickerModule,
    TimepickerModule.forRoot(),
    ColorPickerModule,
    StoreModule.forRoot({ event: eventReducer, calendarConfig: eventConfigReducer }),
  ],
  declarations: [
    CalendarContainerComponent,
    DayComponent,
    CalendarComponent,
    EventListComponent,
    EventFormComponent,
  ],
  exports: [CalendarContainerComponent],
  providers: [CalendarService],
})
export class CalendarModule {}
