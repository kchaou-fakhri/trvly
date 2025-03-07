import { Gregorian } from "./Gregorian"
import { Hijri } from "./Hijri"

export interface Date {
    readable: string
    timestamp: string
    hijri: Hijri
    gregorian: Gregorian
}