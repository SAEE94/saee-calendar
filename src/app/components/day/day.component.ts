import { Component, Input, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngrx/store";
import { EventFormComponent } from "../event-form/event-form.component";
import { DayItem } from "../model/day-item";
import { Event } from "../model/event";
import { CalendarService } from "../service/calendar.service";

@Component({
  selector: "app-day",
  templateUrl: "./day.component.html",
  styleUrls: ["./day.component.scss"],
})
export class DayComponent implements OnInit {
  @Input()
  public day: DayItem;

  public events: Event[];

  constructor(
    private ngbModal: NgbModal,
    private store: Store<{ event }>,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    this.store.select("event").subscribe(({ events }) => {
      this.events = this.calendarService.eventsByDay(events, this.day);
    });
  }

  onRegisterNewEvent() {
    if (![null, undefined].includes(this.day)) {
      const modalRef = this.ngbModal.open(EventFormComponent, {
        backdrop: "static",
        keyboard: false,
        centered: true,
      });
      modalRef.componentInstance.day = this.day;
      modalRef.componentInstance.closeModal.subscribe((event) => {
        modalRef.close();
      });
    }
  }
}
