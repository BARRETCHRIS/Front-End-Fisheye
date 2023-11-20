// import OrderGalleryFactory from './utils/orderGallery.js';

class AppGallery {
    constructor() {
        this.$photographerWrapper = document.querySelector('.photograph-header');
        this.$mediaWrapper = document.querySelector('.gallery');
        this.photographerApi = new PhotographerApi('/data/photographers.json');
        this.orderGalleryFactory = new OrderGalleryFactory();
    }

    async init() {
        await this.photographHeader();
        const orderChoise = document.getElementById('orderChoise');

        // Restaure la valeur du sélecteur à partir du stockage local
        const savedOrder = localStorage.getItem('orderChoise');
        orderChoise.value = savedOrder !== null ? savedOrder : 'none';

        // Ajoutez un gestionnaire d'événements pour le changement du sélecteur
        orderChoise.addEventListener('change', () => this.gallery(orderChoise.value));

        // Appelez la galerie initiale sans tri
        this.gallery('');
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
    //             let medias = await this.photographerApi.getMediaByPhotographerId(photographerId);

    //             // Utiliser la méthode orderMedias de la factory pour trier les médias
    //             medias = this.orderGalleryFactory.orderMedias(medias, 'option1');

    //             medias.forEach(media => {
    //                 // Créez une instance de MediaCardGallery avec l'objet media et le photographe
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
    async gallery(choise) {
        const urlParams = new URLSearchParams(window.location.search);
        const photographerId = urlParams.get('id');

        if (photographerId) {
            try {
                const photographer = await this.photographerApi.getPhotographerById(photographerId);
                let medias = await this.photographerApi.getMediaByPhotographerId(photographerId);

                if (choise) {
                    const orderFactory = new OrderGalleryFactory(choise, medias);
                    medias = orderFactory.orderMedias();
                }

                // Efface le contenu existant de la galerie
                this.$mediaWrapper.innerHTML = '';

                medias.forEach(media => {
                    const mediaTemplate = new MediaCardGallery(media, photographer);
                    const mediaElement = mediaTemplate.createMediaCardGallery();
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
// appGallery.photographHeader();
// appGallery.gallery();
appGallery.init();