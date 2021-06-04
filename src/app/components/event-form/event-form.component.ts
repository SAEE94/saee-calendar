import { Component, EventEmitter, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Store } from "@ngrx/store";
import { DayItem } from "../model/day-item";
import { Event } from "../model/event";
import * as eventActions from "../redux/calendar.action";

@Component({
  selector: "app-event-form",
  templateUrl: "./event-form.component.html",
  styleUrls: ["./event-form.component.scss"],
})
export class EventFormComponent implements OnInit {
  public formGroup: FormGroup;
  public day: DayItem;
  public event: Event;
  public color: string = "#2889e9";
  public formSent;

  public closeModal = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{ events }>
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: this.event ? this.event.id : null,
      title: new FormControl(this.event ? this.event.title : null, [
        Validators.required,
        Validators.maxLength(30),
      ]),
      city: new FormControl(this.event ? this.event.city : null, [
        Validators.required,
      ]),
      time: new FormControl(this.event ? this.event.time : new Date()),
      color: new FormControl(this.event ? this.event.color : "#2889e9"),
      date: new FormControl(
        this.event
          ? this.event.date
          : {
              year: this.day.year,
              month: this.day.month + 1,
              day: this.day.day,
            },
        [Validators.required]
      ),
    });
  }

  public onCloseModal() {
    this.closeModal.emit();
  }

  public onChangeColor() {
    this.formGroup.get("color").setValue(this.color);
  }

  public onCreateEvent() {
    this.formSent = true;
    if (this.formGroup.valid) {
      this.updateDate();

      if (this.formGroup.get("id").value) {
        this.store.dispatch(
          eventActions.updateEvent({
            event: this.formGroup.getRawValue(),
          })
        );
      } else {
        this.store.dispatch(
          eventActions.saveEvent({
            event: this.formGroup.getRawValue(),
          })
        );
      }
      this.closeModal.emit();
    }
  }

  private updateDate() {
    const time: Date = this.formGroup.get("time").value;
    const date = this.formGroup.get("date").value;

    time.setFullYear(date.year);
    time.setMonth(date.month-1);
    time.setDate(date.day);

    this.formGroup.get("date").setValue(date);
    this.formGroup.get("time").setValue(time);
  }
}
