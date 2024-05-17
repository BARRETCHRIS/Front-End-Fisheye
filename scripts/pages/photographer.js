//Mettre le code JavaScript lié à la page photographer.html

const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

console.log(photographerId)

async function getPhotographers() {
    const answer = await fetch("data/photographers.json"); 
    const media= await answer.json();

    const medias = Array.from(media.media);
    const photographers = Array.from(media.photographers)
    console.log(medias, photographers);

    // et bien retourner le tableau photographers seulement une fois récupéré
    return medias + photographers;    
}

async function displayData(medias, photographers) {
        const PortfolioSection = document.querySelector(".portfolio_section");

        
    }

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
