import {RootObject} from '@model/entity/unspleash/RootObject';
import {Method, Params, URLs} from '@services/configuration/config';
import {fetchAPI} from '@services/configuration/MainService';
import {UNSPLEASH_KEY} from '@env';
/**
 * Service class for interacting with the Unsplash API.
 */
export class UNSpleashService {
  /**
   * Fetches photos from Unsplash based on the specified place query.
   *
   * @param page - The page number to retrieve.
   * @param pre_page - The number of items per page.
   * @param query - The search query string.
   * @returns A promise that resolves to a RootObject containing the photos.
   */
  static async getPhotosByPlace(
    page: number,
    pre_page: number,
    query: string,
  ): Promise<RootObject> {
    return new Promise((resolve, reject) => {
      fetchAPI({
        url:
          URLs.UNSPLEASH +
          Params.Search +
          Params.RegexOr +
          Params.PerPage +
          pre_page +
          Params.RegexAnd +
          Params.Page +
          page +
          Params.RegexAnd +
          Params.Query +
          query,
        method: Method.GET,
        params: {},
        headers: {
          Authorization: Params.Authorization + UNSPLEASH_KEY,
        },
      })
        .then(data => {
          resolve(data as RootObject);
        })
        .catch(e => console.log(e));
    });
  }
}
