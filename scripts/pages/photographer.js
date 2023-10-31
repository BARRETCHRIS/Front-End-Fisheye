const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

async function getPhotographerData(photgapherId) {
    const answer = await fetch("data/photographers.json"); 
    const data= await answer.json();

    const photographers = data.photographers.find(p => p.id === parseInt(photographerId));
    const media = data.media.filter(m => m.photographerId === parseInt(photographerId));
    
    return { photographers, media};    
}

async function init() {
    const { photographers, media } = await getPhotographerData(photographerId);

    const photographTemplate = photographerGalleryTemplate(photographers);
    const cardDOM = photographTemplate.getPhotographCardDOM();

    const photographHeader = document.querySelector(".photograph-header");
    photographHeader.appendChild(cardDOM);

    const gallery = document.querySelector('.gallery');
    media.forEach((mediaItem) => {
    const mediaCard = photographTemplate.getGalleryCardDOM(mediaItem);
    gallery.appendChild(mediaCard);
  });
}

init();

