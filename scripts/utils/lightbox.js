function openMediaInLightbox(index) {
  const lightboxMedia = document.getElementById('lightboxMedia');
  lightboxMedia.innerHTML = '';

  const mediaItem = filteredMediaArray[index];
  const mediaCard = photographTemplate.getGalleryCardDOM(mediaItem, index);

  const mediaClone = mediaCard.cloneNode(true);
  mediaClone.classList.add('expanded-media-card');
  
  lightboxMedia.appendChild(mediaClone);

  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'block';

  const closeLightboxButton = document.querySelector('.close-lightbox');
  closeLightboxButton.addEventListener('click', closeLightbox);

  if (mediaItem.video) {
    const mediaVideo = lightboxMedia.querySelector('video');
    mediaVideo.setAttribute('controls', true);
  }
}


function showPrevMedia() {
  const lightboxMedia = document.getElementById('lightboxMedia');
  const currentMedia = lightboxMedia.querySelector('.expanded-media-card');
  const currentIndex = parseInt(currentMedia.getAttribute('data-index'));

  if (currentIndex > 0) {
    const prevMediaCard = document.querySelector(`.media-card-${currentIndex - 1}`);
    openMediaInLightbox(currentIndex - 1);
  }
}

function showNextMedia() {
  const lightboxMedia = document.getElementById('lightboxMedia');
  const currentMedia = lightboxMedia.querySelector('.expanded-media-card');
  const currentIndex = parseInt(currentMedia.getAttribute('data-index'));
  const totalMedia = filteredMediaArray.length;

  if (currentIndex < totalMedia - 1) {
    const nextMediaCard = document.querySelector(`.media-card-${currentIndex + 1}`);
    openMediaInLightbox(currentIndex + 1);
  }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none'; 

    const lightboxMedia = document.getElementById('lightboxMedia');
    lightboxMedia.innerHTML = ''; 
}