class AppGallery {
    constructor() {
        this.$photographerWrapper = document.querySelector('.photograph-header');
        this.$mediaWrapper = document.querySelector('.gallery');
        this.photographerApi = new PhotographerApi('/data/photographers.json');
    }

    async main() {
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
                this.$photographerWrapper.appendChild(template.createPhotographCardGallery());
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
    //             const medias = await this.photographerApi.getMediaByPhotographerId(photographerId);

    //             medias.forEach(media => {
    //                 const Template = new MediaCardGallery(media);
    //                 this.$mediaWrapper.appendChild(Template.createMediaCardGallery());
    //             });
    //         } catch (error) {
    //             console.error('An error occurred while fetching the media:', error);
    //         }
    //     } else {
    //         console.error('Photographer ID not found in the URL');
    //     }
    // }
}

const appGallery = new AppGallery();
appGallery.main();
// appGallery.gallery();
