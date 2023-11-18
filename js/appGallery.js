class AppGallery {
    constructor() {
        this.$photographerWrapper = document.querySelector('.photograph-header');
        this.$mediaWrapper = document.querySelector('.gallery');
        this.photographerApi = new PhotographerApi('/data/photographers.json');
    }

    async photographHeader() {
        // Récupérer l'ID du photographe depuis l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const photographerId = urlParams.get('id');

        // Vérifier si l'ID du photographe est présent dans l'URL
        if (photographerId) {
            try {
                // Récupérer le photographe spécifique par son ID
                const photographer = await this.photographerApi.getPhotographerById(photographerId);

                // Créer la carte du photographe et l'ajouter à la section
                const template = new photographCardGallery(photographer, this.$photographerWrapper);
                template.createPhotographCardGallery();
            } catch (error) {
                console.error('An error occurred while fetching the photographer:', error);
            }
        } else {
            console.error('Photographer ID not found in the URL');
        }
    }

    // async gallery() {
    //     // Récupérer l'ID du photographe depuis l'URL
    //     const urlParams = new URLSearchParams(window.location.search);
    //     const photographerId = urlParams.get('id');

    //     // Vérifier si l'ID du photographe est présent dans l'URL
    //     if (photographerId) {
    //         try {
    //             const photographer = await this.photographerApi.getPhotographerById(photographerId);
    //             const medias = await this.photographerApi.getMediaByPhotographerId(photographerId);

    //             medias.forEach(media => {
    //                 // Créez une instance de MediaCardGallery avec l'objet media
    //                 const mediaTemplate = new MediaCardGallery(media, photographer);
                    
    //                 // Utilisez la méthode createMediaCardGallery pour générer le HTML
    //                 const mediaElement = mediaTemplate.createMediaCardGallery();
                    
    //                 // Ajoutez le HTML généré à $mediaWrapper
    //                 this.$mediaWrapper.appendChild(mediaElement);
    //             });
    //         } catch (error) {
    //             console.error('An error occurred while fetching the media:', error);
    //         }
    //     } else {
    //         console.error('Photographer ID not found in the URL');
    //     }
    // }
    async gallery() {
    // Récupérer l'ID du photographe depuis l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const photographerId = urlParams.get('id');

        // Vérifier si l'ID du photographe est présent dans l'URL
        if (photographerId) {
            try {
                const photographer = await this.photographerApi.getPhotographerById(photographerId);
                const medias = await this.photographerApi.getMediaByPhotographerId(photographerId);

                medias.forEach(media => {
                    // Créez une instance de MediaCardGallery avec l'objet media et le photographe
                    const mediaTemplate = new MediaCardGallery(media, photographer);
                    
                    // Utilisez la méthode createMediaCardGallery pour générer le HTML
                    const mediaElement = mediaTemplate.createMediaCardGallery();
                    
                    // Ajoutez le HTML généré à $mediaWrapper
                    this.$mediaWrapper.appendChild(mediaElement);
                });
            } catch (error) {
                console.error('An error occurred while fetching the media:', error);
            }
        } else {
            console.error('Photographer ID not found in the URL');
        }
    }
}

const appGallery = new AppGallery();
appGallery.photographHeader();
appGallery.gallery();
