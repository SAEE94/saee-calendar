import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as eventAction from "../redux/calendar.action";
import { CalendarService } from "../service/calendar.service";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  days = [];
  year = 0;

  readonly daysWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];
  readonly monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  public month = 0;

  constructor(
    private calendarService: CalendarService,
    private store: Store<{ calendarConfig }>
  ) {}

  ngOnInit(): void {
    this.store.select("calendarConfig").subscribe((resp) => {
      console.log(resp);
      this.year = resp.currentYear;
      this.month = resp.currentMonth;
      this.days = this.calendarService.builCalendar(this.year, this.month);
    });
  }

  public substractMonth() {
    this.store.dispatch(eventAction.subtractMonth());
  }

  public addMonth() {
    this.store.dispatch(eventAction.addMonth());
  }
}
