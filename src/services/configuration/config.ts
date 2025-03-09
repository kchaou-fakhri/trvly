export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const URLs = {
  MAPBOX: 'https://api.mapbox.com/directions/v5/mapbox/driving/',
  UNSPLEASH: 'https://api.unsplash.com/',
  ADHAN: "https://api.aladhan.com/v1/"
};

export const RegexParams = {
  RegexAnd: '&',
  RegexOr: '?',
}
export const UnsplashParams = {
  Authorization: 'Client-ID ',
  Search: 'search/photos',
  Page: 'page=',
  Query: 'query=',
  PerPage: 'per_page=',
};

export const AdhanParams = {
  Timings: 'timings/',
  Timezonestring: 'timezonestring=',
  Latitude: 'latitude=',
  Longitude: 'longitude=',
  Method: 'method='
}
