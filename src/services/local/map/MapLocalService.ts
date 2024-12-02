import {DATAs} from '@data/index';
import {TrvlyCity} from '@model/index';

export class MapLocalService {
  /**
   * Retrieves a list of places.
   *
   * @returns {Promise<TrvlyCity[]>} A promise that resolves to an array of TrvlyCity objects.
   */
  static async getPlaces(): Promise<TrvlyCity[]> {
    return await DATAs.EnDATA;
  }

  /**
   * Retrieves a place by its ID from the list of places.
   *
   * @param selectedPlace - The ID of the place to be retrieved.
   * @returns A promise that resolves to the `TrvlyCity` object corresponding to the selected place.
   */
  static async getPlaceById(selectedPlace: string): Promise<TrvlyCity> {
    return await this.getPlaces().then(
      places =>
        places.filter(
          place =>
            selectedPlace.charAt(4) ==
            place.point.longitude.toString().charAt(4),
        )[0],
    );
  }
}
