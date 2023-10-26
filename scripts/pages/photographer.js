const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

console.log(photographerId)

async function getPhotographerPortfolio() {
    const answer = await fetch("data/photographers.json"); 
    const media= await answer.json();

    const medias = Array.from(media.media);
    const photographers = Array.from(media.photographers);
    console.log(medias, photographers);

    return medias + photographers;    
}

function displayData(medias, photographers) {
    const photographHeader = document.querySelector("photograph-header");
    const PortfolioSection = document.querySelector(".portfolio_section");
    const gallery = document.querySelector(".gallery");
}

async function init() {
    // Récupère les datas des photographes
    const { photographerPortfolio } = await getPhotographerPortfolio();
    displayData(photographerPortfolio);
}

init();