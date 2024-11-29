import {TrvlyPoint} from './Point';

export interface TrvlyCity {
  name: string;
  country: string;
  description: string;
  point: TrvlyPoint;
  details: {
    year_built: string;
    year_established?: string;
    type: string;
  };
}
