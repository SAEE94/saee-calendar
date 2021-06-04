import { Injectable } from "@angular/core";
import { DayItem } from "../model/day-item";
import { Event } from "../model/event";

@Injectable()
export class CalendarService {
  private daysOfMonth: number;
  private startCurrentMonth: Date;
  private year: number;
  private month: number;

  public builCalendar(year: number, month: number) {
    this.year = year;
    this.month = month;
    this.initDate();

    const days: DayItem[] = [];
    let fill = this.startCurrentMonth.getDay() !== 0;
    let day = 0;
    for (let i = 0; day < this.daysOfMonth; i++) {
      if (i < this.startCurrentMonth.getDay() && fill) {
        days.push(null);
      } else {
        day++;
        days.push({
          day: day,
          isWeekend: [6, 7].includes(i),
          year: this.year,
          month: this.month,
        });
        fill = false;
      }
      if (i === 7) {
        i = 0;
      }
      if (i < 7 && day === this.daysOfMonth) {
        this.fillNextMonth(days, i);
      }
    }
    this.fillPreviuosMonth(days);
    return days;
  }

  private initDate() {
    this.daysOfMonth = new Date(this.year, this.month + 1, 0).getDate();

    this.startCurrentMonth = new Date(this.year, this.month, 1);
  }

  private fillNextMonth(days: DayItem[], i) {
    let initDay = 1;
    for (let j = i + 1; j < 7; j++) {
      days.push({
        day: initDay,
        isNextMonth: true,
        year: this.year,
        month: this.month+1,
      });
      initDay++;
    }
  }

  private fillPreviuosMonth(days: DayItem[]) {
    const daysPreviusMonth = new Date(this.year, this.month, 0).getDate();

    const daysToFill = days.filter((item) => item === null).length;
    for (
      let i = daysPreviusMonth - daysToFill + 1;
      i <= daysPreviusMonth;
      i++
    ) {
      for (let j = 0; j < days.length; j++) {
        if (days[j] === null) {
          days[j] = {
            day: i,
            isNextMonth: true,
            year: this.year,
            month: this.month-1,
          };
          break;
        }
      }
    }
  }

  public eventsByMonth(
    events: Event[],
    currentYear: number,
    currentMonth: number
  ) {
    return events.filter(
      (item) =>
        item.date.year === currentYear && item.date.month === currentMonth + 1
    );
  }

  public eventsByDay(events: Event[], day: DayItem) {
    return events.filter((item) => {
      if (
        item.date.year === day.year &&
        item.date.month === day.month + 1 &&
        item.date.day === day.day
      ) {
        return item;
      }
    });
  }
}
