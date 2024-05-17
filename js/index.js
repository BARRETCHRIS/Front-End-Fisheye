import Api from "./api/Api.js"
import Photographer from "./models/Photographer.js";
import PhotographerCard from "./templates/PhotographerCard.js"


const photographersSection = document.querySelector(".photographers_section");
const photographersApi = new Api("./data/photographers.json");

const displayPhotographers = async () => {
    const photographersData = await photographersApi.get();
    const photographers = photographersData.photographers;

    photographers
        .map(photographer => new Photographer(photographer))
        .forEach(photographer => {
            const template = new PhotographerCard(photographer);
            const photographerCard = template.renderCard();
            photographersSection.appendChild(photographerCard);
        });
};

displayPhotographers();


// import Api from './api/Api.js';

// // Création d'une instance de la classe Api
// export const api = new Api();

// // // Utilisation de la méthode pour récupérer les données des photographes
// // api.fetchPhotographers().then((photographers) => {
// //     console.log('Données de retour photographes :', photographers); // Affiche les photographes
// // });

// // // Utilisation de la méthode pour récupérer les données des médias
// // api.fetchMedia().then((media) => {
// //     console.log('Données de retour média :', media); // Affiche les médias
// // });