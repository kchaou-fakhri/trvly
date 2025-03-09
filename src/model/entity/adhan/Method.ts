import { AdhanLocation } from "./AdhanLocation"
import { Params } from "./Params"

export interface Method {
    id: number
    name: string
    params: Params
    location: AdhanLocation
}
