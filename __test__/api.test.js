/**
 * @jest-environment jsdom
 */
 import { getApiKey } from '../src/client/js/helpers/api';
 import { PixabayKeyURL } from '../src/client/js/helpers/constants';


global.fetch = jest.fn(() =>
    Promise.resolve({
        //  fake key
        text: () => Promise.resolve('a8fe79cfe4b6d5799'),
    })
);

beforeEach(() => {
    fetch.mockClear();
});

 describe("fetchKeyInfo from .env via server", () => {
     describe("when API call is successful", () => {
         test("should return api key for Pixabay", async () => {
             expect.assertions(2);
             const result = await getApiKey(PixabayKeyURL);

             expect(result).toEqual('a8fe79cfe4b6d5799');
             expect(fetch).toHaveBeenCalledTimes(1);
         });
     });

     describe("when API call fails", () => {
        test("returns null when exception", async () => {
            fetch.mockImplementationOnce(() => Promise.reject("API is down"));

            const result = await getApiKey(PixabayKeyURL);
            expect(result).toEqual('');
            expect(fetch).toHaveBeenCalledWith(PixabayKeyURL);
        });
    });
 });