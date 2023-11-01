const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

// let likesData = {};

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

  // const gallery = document.querySelector('.gallery');
  const mediaItems = gallery.querySelectorAll('.media-card');

  mediaItems.forEach(mediaItem => {
    const likesElement = mediaItem.querySelector('.likes');
    const likesNbr = mediaItem.querySelector('.likes-nbr');
    likesElement.addEventListener('click', () => {
      let likesCount = parseInt(likesElement.textContent);
      likesCount++;
      likesNbr.textContent = likesCount;

    });
  });

}

init();

function filterMedia() {
  const filterValue = document.getElementById('filterChoise').value;
  const gallery = document.querySelector('.gallery');
  const mediaItems = gallery.querySelectorAll('.media-card');

  const sortedMediaItems = Array.from(mediaItems).sort((a, b) => {
    if (filterValue === 'none'){
      location.reload();
    }else if (filterValue === 'option1') {
      const likesA = parseInt(a.querySelector('.likes').textContent);
      const likesB = parseInt(b.querySelector('.likes').textContent);
      return likesB - likesA;
    } else if (filterValue === 'option2') {
      const dateA = new Date(a.querySelector('.media-date').textContent);
      const dateB = new Date(b.querySelector('.media-date').textContent);
      return dateB - dateA;
    } else if (filterValue === 'option3') {
      const titleA = a.querySelector('.media-title').textContent;
      const titleB = b.querySelector('.media-title').textContent;
      return titleA.localeCompare(titleB);
    }
  });

  gallery.innerHTML = '';
  sortedMediaItems.forEach(item => {
    gallery.appendChild(item);
  });
}





