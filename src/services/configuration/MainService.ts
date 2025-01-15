import {CONSTANTS} from '@trvlyUtils/constants';
import {Method} from './config';

interface IMainService {
  url: string;
  method: Method | undefined;
  params: {};
  headers?: {};
}
/**
 * Fetches data from the API using the provided parameters.
 *
 * @template T - The type of the response data.
 * @param {IMainService} params - The parameters for the API request.
 * @param {string} params.url - The URL of the API endpoint.
 * @returns {Promise<T>} A promise that resolves to the response data of type T.
 * @throws {Error} If the response is not ok or if there is an error during the fetch operation.
 */
export const fetchAPI = async <T>({
  url,
  method,
  params,
  headers,
}: IMainService): Promise<T> => {
  try {
    console.log(url);
    const result = await fetch(url, {
      method: method ? Method.GET : method,
      body: method == Method.GET || undefined ? null : JSON.stringify(params),
      headers: headers ? headers : {},
    });
    if (!result.ok) {
      throw new Error(`${CONSTANTS.STRINGS.RESPONSE_ERROR} ${result.status}`);
    } else {
      const json = await result.json();
      return json;
    }
  } catch (e) {
    throw e;
  }
};
