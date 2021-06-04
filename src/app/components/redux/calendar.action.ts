import { createAction, props } from "@ngrx/store";
import { Event } from "../model/event";

export const saveEvent = createAction(
  "[CALENDAR COMPONENT] Save new event",
  props<{ event: Event }>()
);
export const updateEvent = createAction(
  "[CALENDAR COMPONENT] Update new event",
  props<{ event: Event }>()
);
export const deleteEvent = createAction(
  "[CALENDAR COMPONENT] Delete new event",
  props<{ id: number }>()
);
export const deleteAllEvent = createAction(
  "[CALENDAR COMPONENT] Delete all event",
  props<{ currentYear: number; currentMonth: number }>()
);
export const listAllEvents = createAction(
  "[CALENDAR COMPONENT] List all events"
);

export const addMonth = createAction("[CALENDAR COMPONENT] Add month");

export const subtractMonth = createAction(
  "[CALENDAR COMPONENT] Substract month"
);
