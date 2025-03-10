import { IMAGES } from "@assets/img";
import { Timings } from "@model/entity/adhan/Timings";

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
    name: 'Fajr',
    next: 'Dhohr',
    time: timings.Fajr,
    nextTime: timings.Dhuhr,
    image: IMAGES.FajrBackground
  },
  {
    name: 'Dhohr',
    next: 'Asr',
    time: timings.Dhuhr,
    nextTime: timings.Asr,
    image: IMAGES.DhohrBackground
  },
  {
    name: 'Asr',
    next: 'Maghrib',
    time: timings.Asr,
    nextTime: timings.Maghrib,
    image: IMAGES.AsrBackground
  },
  {
    name: 'Maghrib',
    next: 'Isha',
    time: timings.Maghrib,
    nextTime: timings.Isha,
    image: IMAGES.MaghribBackground
  },
  {
    name: 'Isha',
    next: 'Fajr',
    time: timings.Isha,
    nextTime: timings.Fajr,
    image: IMAGES.IchaBackground
  }
];

export const ZERO = '0'
