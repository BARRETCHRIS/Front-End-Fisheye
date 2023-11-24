class Api { //Définit une classe Api.
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        this._url = url; //Le constructeur prend une URL en paramètre et initialise la propriété _url de l'instance de la classe avec cette URL.
    }

    async get() { //La méthode get utilise fetch pour récupérer les données à partir de l'URL spécifiée.
        try {
            const response = await fetch(this._url);
            const data = await response.json();
            return data; //Elle retourne les données JSON obtenues.
        } catch (error) {
            console.log('An error occurred:', error);
            throw error; // Propagate the error further - En cas d'erreur, elle imprime un message dans la console et propage l'erreur.
        }
    }
}

class PhotographerApi extends Api { //Définit une classe PhotographerApi qui hérite de la classe Api.
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        super(url); //Appelle le constructeur de la classe parente avec l'URL fournie.
    }

    // Get Photographers data
    async getPhotographers() { //Utilise la méthode get de la classe parente pour obtenir les données, puis retourne la liste des photographes.
        try {
            const data = await this.get();
            return data.photographers || [];
        } catch (error) {
            console.error('An error occurred while fetching photographers:', error);
            throw error;
        }
    }

    async getPhotographerById(id) { //Utilise la méthode get de la classe parente pour obtenir les données, puis retourne un photographe selon son ID.
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

    async getMedias() { //Utilise la méthode get de la classe parente pour obtenir les données, puis retourne la liste des medias.
        try {
            const data = await this.get();
            return data.media || [];
        } catch (error) {
            console.error('An error occurred while fetching photographers:', error);
            throw error; 
        }
    }

    async getMediaByPhotographerId(photographerId) { //Utilise la méthode get de la classe parente pour obtenir les données, puis retourne la liste des medias selon l'id d'un photographe particulier.
        try {
            const data = await this.get();

            if (data.media) {
                return data.media.filter(media => media.photographerId.toString() === photographerId);
            } else {
                throw new Error('La propriété "media" n\'est pas présente dans le fichier JSON.');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des médias :', error);
            return [];
        }
    }
}