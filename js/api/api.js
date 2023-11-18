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
            throw error;
        }
    }

    async getPhotographerById(id) {
        try {
            const data = await this.get();
            const photographers = data.photographers || [];

            // Rechercher le photographe par son ID
            const photographer = photographers.find(p => p.id.toString() === id);

            if (photographer) {
                return photographer;
            } else {
                throw new Error(`Photographer with ID ${id} not found`);
            }
        } catch (error) {
            console.error('An error occurred while fetching the photographer by ID:', error);
            throw error;
        }
    }

    async getMedias() {
        try {
            const data = await this.get();
            return data.media || [];
        } catch (error) {
            console.error('An error occurred while fetching photographers:', error);
            throw error; 
        }
    }

    async getMediaByPhotographerId(photographerId) {
        try {
            const data = await this.get();

            if (data.media) {
                return data.media.filter(media => media.photographerId === photographerId);
            } else {
                throw new Error('La propriété "media" n\'est pas présente dans le fichier JSON.');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des médias :', error);
            return [];
        }
    }
}
