let galleryMediasArray = ""

function openLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'flex'; // Utilise 'flex' pour laisser les éléments occuper l'espace disponible
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';

    const lightboxMedia = document.getElementById('lightboxMedia');
    lightboxMedia.innerHTML = '';
}

function showMediaInLightbox(galleryMedias, galleryPhotographer, clickedMedia, clickedMediaImg) {
    const lightboxMedia = document.getElementById('lightboxMedia');

    const clickedMediaIndex = galleryMedias.findIndex(media => media === clickedMedia);
    console.log(galleryMedias);

    let mediaContent = '';
    
    galleryMedias.forEach((media, index) => {
        const visibilityClass = index === clickedMediaIndex ? 'visible' : 'hidden';
        if (media.image) {
            mediaContent += `<div class="lightbox-media-item ${visibilityClass}" data-index="${index}">
                                <img src="assets/images/${galleryPhotographer.name}/${media.image}" alt="${media.title}" tabindex="0">
                                <h3>${media.title}</h3>
                            </div>`;
        } else if (media.video) {
            mediaContent += `<div class="lightbox-media-item ${visibilityClass}" data-index="${index}">
                                <video src="assets/images/${galleryPhotographer.name}/${media.video}" type="video/mp4" tabindex="0" controls autoplay></video>
                                <h3>${media.title}</h3>
                            </div>`;
        }
    });

    lightboxMedia.innerHTML = mediaContent;
}


function showPrevMedia() {
    navigateMedia(-1);
}

function showNextMedia() {
    navigateMedia(1);
}

function navigateMedia(direction) {
    const lightboxMedia = document.getElementById('lightboxMedia');
    const mediaItems = lightboxMedia.querySelectorAll('.lightbox-media-item');
    const currentMedia = lightboxMedia.querySelector('.lightbox-media-item.visible');

    if (currentMedia) {
        const currentIndex = parseInt(currentMedia.getAttribute('data-index'));
        const totalMedia = mediaItems.length;

        const newIndex = (currentIndex + direction + totalMedia) % totalMedia;

        currentMedia.classList.remove('visible');
        currentMedia.classList.add('hidden');

        const newMedia = mediaItems[newIndex];
        if (newMedia) {
            newMedia.classList.remove('hidden');
            newMedia.classList.add('visible');
        }
    }
}


