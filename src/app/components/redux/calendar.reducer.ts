import { createReducer, on } from "@ngrx/store";
import * as eventActions from "./calendar.action";

export const initialState = {
  events: [],
};

const _eventReducer = createReducer(
  initialState,
  on(eventActions.listAllEvents, (state) => ({
    ...state,
  })),
  on(eventActions.saveEvent, (state, { event }) => ({
    ...state,
    events: [...state.events, { ...event, id: state.events.length + 1 }],
  })),
  on(eventActions.deleteEvent, (state, { id }) => ({
    ...state,
    events: state.events.filter((item) => item.id !== id),
  })),
  on(eventActions.deleteAllEvent, (state, { currentMonth, currentYear }) => ({
    ...state,
    events: state.events.filter(
      (item) =>
        item.date.month !== currentMonth + 1 && item.date.year === currentYear
    ),
  })),
  on(eventActions.updateEvent, (state, { event }) => ({
    ...state,
    events: [
      ...state.events.filter((item) => item.id !== event.id),
      { ...event },
    ],
  }))
);

export function eventReducer(state, action) {
  return _eventReducer(state, action);
}
