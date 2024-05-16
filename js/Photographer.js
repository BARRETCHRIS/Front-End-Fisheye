import Api from "./api/Api.js"
import Photographer from "./models/Photographer.js";
import MediasFactory from "./factories/MediasFactory.js";

import GalleryHeader from "./templates/GalleryHeader.js";
import MediasCard from "./templates/MediasCard.js";

import LikesManager from "./utils/LikesManager.js ";

import { openCloseFormContact, validateForm } from "./utils/contactForm.js";

import { FilterManager, MediaFilteredManager } from "./utils/FiltersManager.js";

import LightboxManager from "./utils/LightboxManager.js";

const photographersApi = new Api("./data/photographers.json");
const photographerId = new URLSearchParams(window.location.search).get("id");

export const getPhotographerAndMediaById = async () => {
    const { photographers, media } = await photographersApi.get();
    const photographer = photographers
        .map(photographer => new Photographer(photographer))
        .find(photographer => photographer.id == photographerId);
        // console.log(photographer);
    const medias = media
        .map(media => new MediasFactory(media))
        .filter(media => media.photographerId == photographerId);
        // console.log(medias);
    return { photographer, medias };
};

const displayGallery = async() => {
    const { photographer, medias } = await getPhotographerAndMediaById();
    const galleryHeaderTemplate = new GalleryHeader(photographer);
    galleryHeaderTemplate.renderCard();
    const mediasTemplate = new MediasCard(photographer, medias);
    mediasTemplate.renderMedias();

    const likesManager = new LikesManager();
    likesManager.initialize();

    openCloseFormContact();
    validateForm();
    
    new FilterManager();
    new MediaFilteredManager(mediasTemplate);

    const lightbox = new LightboxManager(mediasTemplate);
    lightbox.initialize();
}

displayGallery();