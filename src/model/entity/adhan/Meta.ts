import { Method } from "./Method"
import { Offset } from "./Offest"

export interface Meta {
    latitude: number
    longitude: number
    timezone: string
    method: Method
    latitudeAdjustmentMethod: string
    midnightMode: string
    school: string
    offset: Offset
}