function openLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'block'; 
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none'; 

    const lightboxMedia = document.getElementById('lightboxMedia');
    lightboxMedia.innerHTML = ''; 
}

function showPrevMedia() {
//   const lightboxMedia = document.getElementById('lightboxMedia');
//   const currentMedia = lightboxMedia.querySelector('.expanded-media-card');
//   const currentIndex = parseInt(currentMedia.getAttribute('data-index'));

//   if (currentIndex > 0) {
//     const prevMediaCard = document.querySelector(`.media-card-${currentIndex - 1}`);
//     openMediaInLightbox(currentIndex - 1);
//   }
  console.log("Good Prev");
}

function showNextMedia() {
//   const lightboxMedia = document.getElementById('lightboxMedia');
//   const currentMedia = lightboxMedia.querySelector('.expanded-media-card');
//   const currentIndex = parseInt(currentMedia.getAttribute('data-index'));
//   const totalMedia = filteredMediaArray.length;

//   if (currentIndex < totalMedia - 1) {
//     const nextMediaCard = document.querySelector(`.media-card-${currentIndex + 1}`);
//     openMediaInLightbox(currentIndex + 1);
//   }
  console.log("Good Next");
}