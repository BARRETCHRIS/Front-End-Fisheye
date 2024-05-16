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