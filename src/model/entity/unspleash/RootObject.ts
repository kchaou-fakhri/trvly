import {Result} from './Result';

export interface RootObject {
  total: number;
  total_pages: number;
  results: Result[];
}
