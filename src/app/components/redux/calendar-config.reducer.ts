import { createReducer, on } from "@ngrx/store";
import * as eventActions from "./calendar.action";

const currentDate = new Date();
export const initialState = {
  currentYear: currentDate.getFullYear(),
  currentMonth: currentDate.getMonth(),
};

const _eventConfigReducer = createReducer(
  initialState,
  on(eventActions.addMonth, (state) => ({
    ...state,
    currentYear:
      state.currentMonth < 11 ? state.currentYear : state.currentYear + 1,
    currentMonth: state.currentMonth === 11 ? 0 : state.currentMonth + 1,
  })),
  on(eventActions.subtractMonth, (state) => ({
    ...state,
    currentYear:
      state.currentMonth > 0 ? state.currentYear : state.currentYear - 1,
    currentMonth: state.currentMonth === 0 ? 11 : state.currentMonth - 1,
  }))
);

export function eventConfigReducer(state, action) {
  return _eventConfigReducer(state, action);
}
