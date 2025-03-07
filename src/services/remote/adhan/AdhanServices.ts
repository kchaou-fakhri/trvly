import { RootObject } from '@model/entity/unspleash/RootObject';
import { AdhanParams, Method, RegexParams, URLs } from '@services/configuration/config';
import { fetchAPI } from '@services/configuration/MainService';
/**
 * Service class for interacting with the AL_ADHAN API.
 */
export class ADHANService {
    /**
     * Fetches photos from AL_ADHAN based on the specified place.
     *
     * @param page - The page number to retrieve.
     * @param pre_page - The number of items per page.
     * @param query - The search query string.
     * @returns A promise that resolves to a RootObject containing the photos.
     */
    static async getPrayerTime(

    ): Promise<RootObject> {
        return new Promise((resolve, reject) => {
            fetchAPI({
                url:
                    URLs.ADHAN +
                    AdhanParams.Timings +
                    '07-03-2025' +
                    RegexParams.RegexOr +
                    AdhanParams.Latitude +
                    '36.565555' +
                    RegexParams.RegexAnd +
                    AdhanParams.Longitude +
                    '10.5533' +
                    RegexParams.RegexAnd +
                    AdhanParams.Timezonestring +
                    "UTC" +
                    RegexParams.RegexAnd +
                    AdhanParams.Method +
                    "3"

                ,
                method: Method.GET,
                params: {},
            })
                .then(data => {
                    resolve(data as RootObject);
                })
                .catch(e => console.log(e));
        });
    }
}
