import { IMAGES } from "@assets/img";
import { Timings } from "@model/entity/adhan/Timings";
import { TranslationPrayer } from "./translation/Translation";

export const CONSTANTS = {
  MAPBOX: {
    URL_STYLE: 'mapbox://styles/mapbox/outdoors-v12',
  },
  STRINGS: {
    RESPONSE_ERROR: 'Response status: ',
  },
};

export enum TrvlyPermissionStatus {
  GRANTED = 'granted',
  DENIED = 'denied',
  NEVER_ASK_AGAIN = 'never_ask_again',
}

export const Prayers = (timings: Timings) => [
  {
    name: TranslationPrayer.Fajr,
    next: TranslationPrayer.Dhohr,
    time: timings.Fajr,
    nextTime: timings.Dhuhr,
    image: IMAGES.FajrBackground
  },
  {
    name: TranslationPrayer.Dhohr,
    next: TranslationPrayer.Asr,
    time: timings.Dhuhr,
    nextTime: timings.Asr,
    image: IMAGES.DhohrBackground
  },
  {
    name: TranslationPrayer.Asr,
    next: TranslationPrayer.Maghrib,
    time: timings.Asr,
    nextTime: timings.Maghrib,
    image: IMAGES.AsrBackground
  },
  {
    name: TranslationPrayer.Maghrib,
    next: TranslationPrayer.Isha,
    time: timings.Maghrib,
    nextTime: timings.Isha,
    image: IMAGES.MaghribBackground
  },
  {
    name: TranslationPrayer.Isha,
    next: TranslationPrayer.Fajr,
    time: timings.Isha,
    nextTime: timings.Fajr,
    image: IMAGES.IchaBackground
  }
];

export const ZERO = '0'
