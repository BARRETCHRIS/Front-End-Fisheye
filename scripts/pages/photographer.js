const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

async function getPhotographerData(photgapherId) {
    const answer = await fetch("data/photographers.json"); 
    const data= await answer.json();

    const photographers = data.photographers.find(p => p.id === parseInt(photographerId));
    const media = data.media.filter(m => m.photographerId === parseInt(photographerId));
    
    return {photographers, media};    
}

async function init() {

    const { photographers, media } = await getPhotographerData(photographerId);

    const photographTemplate = photographerGalleryTemplate(photographers);
    const cardDOM = photographTemplate.getPhotographCardDOM();

    const photographHeader = document.querySelector(".photograph-header");
    photographHeader.appendChild(cardDOM);

    const gallery = document.querySelector('.gallery');

    media.forEach((mediaItem, index) => {
    const mediaCard = photographTemplate.getGalleryCardDOM(mediaItem, index);
    gallery.appendChild(mediaCard);
  }); 

  const totalLikesDOM = photographTemplate.getTotalLikesDOM(media);
  gallery.appendChild(totalLikesDOM);

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

  mediaItems.forEach(mediaItem => {
    mediaItem.addEventListener('click', () => openMediaInLightbox(mediaItem));
  });
}

init();

function filterMedia() {
  const filterValue = document.getElementById('filterChoise').value;
  const gallery = document.querySelector('.gallery');
  const mediaItems = gallery.querySelectorAll('.media-card');

  const sortedMediaItems = Array.from(mediaItems)
  sortedMediaItems.sort((a, b) => {
    if (filterValue === 'none'){
      const indexA = parseInt(a.getAttribute('data-index'));
      const indexB = parseInt(b.getAttribute('data-index'));
      return indexA - indexB;
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

  // localStorage.setItem('selectedFilter', filterValue);

}

// function loadSelectedFilter() {
//   const selectedFilter = localStorage.getItem('selectedFilter');
//   if (selectedFilter) {
//     document.getElementById('filterChoise').value = selectedFilter;
//   }
// }

function openMediaInLightbox(mediaCard) {
  const lightboxMedia = document.getElementById('lightboxMedia');
  lightboxMedia.innerHTML = ''; 

  const mediaClone = mediaCard.cloneNode(true);
  mediaClone.classList.add('expanded-media-card');
  lightboxMedia.appendChild(mediaClone);

  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'block'; 

  const closeLightboxButton = document.querySelector('.close-lightbox');
  closeLightboxButton.addEventListener('click', closeLightbox);
}

function showPrevMedia() {
  const lightboxMedia = document.getElementById('lightboxMedia');
  const currentMedia = lightboxMedia.querySelector('.expanded-media-card');
  const currentIndex = parseInt(currentMedia.getAttribute('data-index'));

  if (currentIndex > 0) {
      const prevMediaCard = document.querySelector(`.media-card-${currentIndex - 1}`);
      openMediaInLightbox(prevMediaCard);
  }
}

function showNextMedia() {
  const lightboxMedia = document.getElementById('lightboxMedia');
  const currentMedia = lightboxMedia.querySelector('.expanded-media-card');
  const currentIndex = parseInt(currentMedia.getAttribute('data-index'));
  const totalMedia = document.querySelectorAll('.media-card').length;

  if (currentIndex < totalMedia - 2) {
      const nextMediaCard = document.querySelector(`.media-card-${currentIndex + 1}`);
      openMediaInLightbox(nextMediaCard);
  }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none'; 

    const lightboxMedia = document.getElementById('lightboxMedia');
    lightboxMedia.innerHTML = ''; 
}