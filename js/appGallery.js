// let galleryMedias = [];
// let galleryPhotographer = {};

// Classe principale pour l'application de la galerie
class AppGallery {
    constructor() {
	// Sélection des éléments HTML et initialisation d'instances de classes
        this.$photographerWrapper = document.querySelector('.photograph-header');
        this.$mediaWrapper = document.querySelector('.gallery');
        this.photographerApi = new PhotographerApi('/data/photographers.json');
        this.orderGalleryFactory = new OrderGalleryFactory();
        this.mediaImg = document.querySelector('.mediaImg');


        this.galleryMedias = [];
        this.galleryPhotographer = {};
    }

    /**
     * Méthode d'initialisation de l'application
     */
    async init() {
        // Appelle la méthode pour afficher l'en-tête du photographe
        await this.photographHeader();
        // Récupére l'élément du sélecteur pour l'ordre des médias
        const orderChoise = document.getElementById('orderChoise');

        // Restaure la valeur du sélecteur pour Firefox
        orderChoise.value = 'none';

        // Gestionnaire d'événements pour le changement du sélecteur
        orderChoise.addEventListener('change', () => this.gallery(orderChoise.value));

        // Appel à la galerie initiale sans tri
        this.gallery('');   
    }

    /**
     * Méthode pour afficher l'en-tête du photographe
     */
    async photographHeader() {
        // Récupérer l'ID du photographe depuis l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const photographerId = urlParams.get('id');

        // Vérifie si l'ID du photographe est présent dans l'URL
        if (photographerId) {
            try {
                // Récupére le photographe spécifique par son ID
                const photographer = await this.photographerApi.getPhotographerById(photographerId);

                // Créé la carte du photographe et l'ajoute à la section
                const template = new photographCardGallery(photographer, this.$photographerWrapper);
                template.createPhotographCardGallery();
                this.galleryPhotographer = photographer;
                console.log(this.galleryPhotographer);
                return this.galleryPhotographer;
            } catch (error) {
                console.error('An error occurred while fetching the photographer:', error);
            }
        } else {
            console.error('Photographer ID not found in the URL');
        }
    }

    /**
     * Méthode pour afficher la galerie de médias
     * @param {string} choise - L'option de tri
     */
    async gallery(choise) {
        // Récupére l'ID du photographe depuis l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const photographerId = urlParams.get('id');

        if (photographerId) {
            try {
                // Récupére les informations du photographe spécifique par son ID
                const photographer = await this.photographerApi.getPhotographerById(photographerId);
                // Récupére les médias associés au photographe
                let medias = await this.photographerApi.getMediaByPhotographerId(photographerId);

                // Trie les médias en fonction de l'option choisie
                if (choise) {
                    const orderFactory = new OrderGalleryFactory(choise, medias);
                    medias = orderFactory.orderMedias();
                }

                // Efface le contenu existant de la galerie
                this.$mediaWrapper.innerHTML = '';

                // Affiche chaque média dans la galerie
                medias.forEach(media => {
                    // Crée un template de carte pour chaque média
                    const mediaTemplate = new MediaCardGallery(media, photographer);
                    // Crée l'élément HTML correspondant
                    const mediaElement = mediaTemplate.createMediaCardGallery();

                    // Ajoute un écouteur d'événements pour les clics sur les likes
                    const likesElement = mediaElement.querySelector('.likes');
                    likesElement.addEventListener('click', () => this.handleLikeClick(media.id));

                    // Ajoute les éléments medias à la galerie
                    this.$mediaWrapper.appendChild(mediaElement);

                    // Ajoute un écouteur d'événements pour ouvrir la lightbox lors du clic sur une image ou vidéo
                    const mediaImg = mediaElement.querySelector(".mediaImg");
                    mediaImg.addEventListener('click', (event) => {
                        // Vérifie si l'élément clic est une image ou une vidéo avec la classe "mediaImg"
                        if (event.target.classList.contains('mediaImg')) {
                            this.openLightboxHandler(mediaImg, media);
                        }
                    }); 

                    // Ajoute un écouteur d'événements pour ouvrir la lightbox en appuyant sur la touche "Entrée"
                    mediaElement.addEventListener('keydown', (event) => {
                        if (event.key === 'Enter' && event.target.classList.contains('mediaImg')) {
                            this.openLightboxHandler(mediaImg, media);
                        }
                    }); 
                });
                this.galleryMedias = medias;
                // console.log(this.galleryMedias);
                return this.galleryMedias;
            } catch (error) {
                console.error('An error occurred while fetching the media:', error);
            }
        } else {
            console.error('Photographer ID not found in the URL');
        } 
    }

    /**
     * Méthode pour gérer les clics sur les likes
     * @param {string} mediaId - L'ID du média
     */
    handleLikeClick(mediaId) {
        // Appel à la fonction externe pour gérer les likes
        toggleLike(mediaId);
    }

    /**
     * Méthode pour ouvrir la lightbox avec le média donné
     * @param {HTMLElement} mediaImg - L'élément de l'image ou de la vidéo cliquée
     * @param {Object} media - Les informations sur le média
     */
    openLightboxHandler(mediaImg, media) {
        // Ouvre la lightbox
        openLightbox();

        // Affiche le média dans la lightbox
        showMediaInLightbox(this.galleryMedias, this.galleryPhotographer, media, mediaImg);
    }   
}

// Instance de l'application de galerie
const appGallery = new AppGallery();
appGallery.init();