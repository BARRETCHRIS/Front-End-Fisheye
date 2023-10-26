const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

console.log(photographerId)

async function getPhotographerData(photgapherId) {
    const answer = await fetch("data/photographers.json"); 
    const data= await answer.json();

    // const medias = Array.from(media.media);
    // const photographers = Array.from(media.photographers);

    const photographers = data.photographers.find(p => p.id === parseInt(photographerId));
    const media = data.media.filter(m => m.photographerId === parseInt(photographerId));
  


    console.log(media, photographers);

    return { photographers, media };    
}

function displayData(medias, photographers) {
    const photographHeader = document.querySelector("photograph-header");
    const PortfolioSection = document.querySelector(".portfolio_section");
    const gallery = document.querySelector(".gallery");
}

async function init() {
    const { photographers, media } = await getPhotographerData(photographerId);

    const photographTemplate = photographerGalleryTemplate(photographers);
    const cardDOM = photographTemplate.getPhotographCardDOM();

    const photographHeader = document.querySelector(".photograph-header");
    photographHeader.appendChild(cardDOM);

    const PortfolioSection = document.querySelector(".portfolio_section");
    const gallery = document.querySelector(".gallery");

    

    console.log("Informations du photographe :", photographers);
    console.log("Médias associés :", media);
}

init();