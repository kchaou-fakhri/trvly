import { AdhanResult } from "@model/entity/adhan/AdhanResult";

export interface AdhanState {
    data: AdhanResult | undefined
    loading: boolean
    error: String | undefined
}