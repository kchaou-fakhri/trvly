export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const URLs = {
  MAPBOX: 'https://api.mapbox.com/directions/v5/mapbox/driving/',
  UNSPLEASH: 'https://api.unsplash.com/',
};

export const Params = {
  Authorization: 'Client-ID ',
  Search: 'search/photos',
  Page: 'page=',
  Query: 'query=',
  PerPage: 'per_page=',
  RegexAnd: '&',
  RegexOr: '?',
};
