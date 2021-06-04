import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngrx/store";
import { EventFormComponent } from "../event-form/event-form.component";
import { Event } from "../model/event";
import * as eventAction from "../redux/calendar.action";
import { CalendarService } from "../service/calendar.service";
@Component({
  selector: "app-event-list",
  templateUrl: "./event-list.component.html",
  styleUrls: ["./event-list.component.scss"],
})
export class EventListComponent implements OnInit {
  public events: Event[];
  private currentYear;
  private currentMonth;
  constructor(
    private store: Store<{ event; calendarConfig }>,
    private ngbModal: NgbModal,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    this.store.subscribe(({ event, calendarConfig }) => {
      this.currentYear = calendarConfig.currentYear;
      this.currentMonth = calendarConfig.currentMonth;
      this.events = this.calendarService.eventsByMonth(
        event.events,
        this.currentYear,
        this.currentMonth
      );
    });
  }

  public onRemove(event: Event) {
    const deleteEvent = confirm("¿Do you want delete this event?");
    if (deleteEvent) {
      this.store.dispatch(eventAction.deleteEvent({ id: event.id }));
    }
  }

  public onEdit(event: Event) {
    const modalRef = this.ngbModal.open(EventFormComponent, {
      backdrop: "static",
      keyboard: false,
      centered: true,
    });
    modalRef.componentInstance.event = event;
    modalRef.componentInstance.closeModal.subscribe((event) => {
      modalRef.close();
    });
  }

  public onRemoveAll() {
    const deleteEvent = confirm("¿Do you want remove all events?");
    if (deleteEvent) {
      this.store.dispatch(
        eventAction.deleteAllEvent({
          currentYear: this.currentYear,
          currentMonth: this.currentMonth,
        })
      );
    }
  }
}
