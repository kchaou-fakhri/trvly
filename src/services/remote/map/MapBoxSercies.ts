import {Method, URLs} from '@services/configuration/config';
import {fetchAPI} from '@services/configuration/MainService';
import {MAPBOX_KEY} from '@env';
import {TrvlyPoint, ResponseMapBox} from '@model/index';

/**
 * A singleton service class for interacting with the MapBox API.
 */
export class MapBoxService {
  private static instance: MapBoxService;

  private constructor() {}

  /**
   * Fetches the MapBox token from the API.
   *
   * @returns {Promise<string>} A promise that resolves to the MapBox token.
   */
  public getMapBoxNavigationPath(
    from: TrvlyPoint,
    to: TrvlyPoint,
  ): Promise<ResponseMapBox> {
    return new Promise(resolve => {
      fetchAPI({
        url: `${URLs.MAPBOX}${from.longitude}%2C${from.latitude}%3B${to.longitude}%2C${to.latitude}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${MAPBOX_KEY}`,
        method: Method.GET,
        params: {},
      })
        .then(data => {
          resolve(data as ResponseMapBox);
        })
        .catch(e => console.error(e));
    });
  }

  /**
   * Returns the singleton instance of the MapBoxService.
   *
   * @returns {MapBoxService} The singleton instance of the MapBoxService.
   */
  public static getInstance(): MapBoxService {
    if (this.instance == null) {
      this.instance = new MapBoxService();
    }
    return this.instance;
  }
}
