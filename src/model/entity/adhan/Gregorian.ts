import { Designation } from "./Designation"
import { Month } from "./Month"
import { Weekday } from "./WeekDay"

export interface Gregorian {
    date: string
    format: string
    day: string
    weekday: Weekday
    month: Month
    year: string
    designation: Designation
    lunarSighting: boolean
}
