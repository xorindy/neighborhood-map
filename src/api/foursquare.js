class Helper {
    static baseURL() {
        return 'https://api.foursquare.com/v2';
    }

    static auth() {
        const keys = {
            client_id: '1OHRXNFKHBMCPQXLUR32TQ4FG2HCIVDFERWN2RVBFPH34MDH',
            client_secret: 'YTCU10YMNIIM2IMMR1M23DXZV021G45EVSWECJHYWLGQU0IP',
            v: '20181004'
        };

        // Return keys into an array, and make a string literal of all the keys combined
        return Object.keys(keys)
            .map(key => `${key}=${keys[key]}`)
            .join('&');
    }

    // Build the URL
    static urlBuilder(urlParams) {
        if(!urlParams) { // If empty, return nothing
            return '';
        } else {
            return Object.keys(urlParams)
                .map(key => `${key}=${urlParams[key]}`)
                .join('&');
        }
            
    }

    static headers() {
        return {
            Accept: 'application/json'
        };
    }

    static simpleFetch(endURL, method, urlParams) {
        let requestData = {
            method,
            headers: Helper.headers()
        };

        return fetch(`${Helper.baseURL()}${endURL}?${Helper.auth()}&${Helper.urlBuilder(urlParams)}`,
            requestData)
            .then(response => response.json());
    }
}

export default class FoursquareAPI {

    // Return search URL
    static search(urlParams) {
        return Helper.simpleFetch('/venues/search', 'GET', urlParams);
    }

    // Return place detail URL
    static getPlaceDetails(VENUE_ID) {
        return Helper.simpleFetch(`/venues/${VENUE_ID}`, 'GET');
    }

    // Return photos of places
    static getPlacePhotos(VENUE_ID) {
        return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, 'GET');
    }
}