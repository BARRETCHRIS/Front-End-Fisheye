class Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        this._url = url;
    }

    async get() {
        try {
            const response = await fetch(this._url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log('An error occurred:', error);
            throw error; // Propagate the error further
        }
    }
}

class PhotographerApi extends Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        super(url);
    }

    // Get Photographers data
    async getPhotographers() {
        try {
            const data = await this.get();
            return data.photographers || [];
        } catch (error) {
            console.error('An error occurred while fetching photographers:', error);
            throw error; // Propagate the error further
        }
    }
}
