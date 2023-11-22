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

        // Restaure la valeur du sélecteur pour Firefox
        orderChoise.value = 'none';

        // Gestionnaire d'événements pour le changement du sélecteur
        orderChoise.addEventListener('change', () => this.gallery(orderChoise.value));

        // Appel à la galerie initiale sans tri
        this.gallery('');
        
    }

    async photographHeader() {
        // Récupérer l'ID du photographe depuis l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const photographerId = urlParams.get('id');

        // Vérifie si l'ID du photographe est présent dans l'URL
        if (photographerId) {
            try {
                // Récupére le photographe spécifique par son ID
                const photographer = await this.photographerApi.getPhotographerById(photographerId);

                // Créé la carte du photographe et l'ajouter à la section
                const template = new photographCardGallery(photographer, this.$photographerWrapper);
                template.createPhotographCardGallery();
            } catch (error) {
                console.error('An error occurred while fetching the photographer:', error);
            }
        } else {
            console.error('Photographer ID not found in the URL');
        }
    }

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

                    // écouteur d'événements pour les clics sur les likes
                    const likesElement = mediaElement.querySelector('.likes');
                    likesElement.addEventListener('click', () => this.handleLikeClick(media.id));

                    this.$mediaWrapper.appendChild(mediaElement);
                });
            } catch (error) {
                console.error('An error occurred while fetching the media:', error);
            }
        } else {
            console.error('Photographer ID not found in the URL');
        }
        
    }
    // Méthode pour gérer les clics sur les likes
    handleLikeClick(mediaId) {
        toggleLike(mediaId);
    }
    
}

const appGallery = new AppGallery();
appGallery.init();

