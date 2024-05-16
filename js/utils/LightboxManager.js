export default class LightboxManager {
    constructor(medias) {
        this.lightboxWrapper = document.querySelector('.lightbox_wrapper');
        this.btnClose = document.querySelector('.btn_close_lightbox');
        this.btnPrevious = document.querySelector('.btn_previous');
        this.btnNext = document.querySelector('.btn_next');
        this.lightboxMedia = document.querySelector('.lightbox_media');
        this.mediaProvider = Array.from(document.querySelectorAll('.gallery_card a'));
        this.photographer = medias.photographer;
        this.mediasList = medias.medias;
        this.currentIndex = 0;
        this.initialize();
    }

    initialize() {
        this.mediaProvider.forEach(media => {
            media.addEventListener('click', () => {
                const mediaId = media.dataset.media;
                const mediaIndex = this.mediasList.findIndex(media => media.id == mediaId);
                this.currentIndex = mediaIndex;
                this.lightboxWrapper.style.display = 'flex';
                this.btnClose.focus();
                this.lightboxTemplate();
            });
        });

        document.addEventListener('keyup', e => {
            switch (e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.previousMedia();
                    break;
                case 'ArrowRight':
                    this.nextMedia();
                    break;
            }
        });

        this.btnPrevious.addEventListener('click', () => this.previousMedia());
        this.btnNext.addEventListener('click', () => this.nextMedia());
        this.btnClose.addEventListener('click', () => this.closeLightbox());
    }

    lightboxTemplate() {
        const currentMedia = this.mediasList[this.currentIndex];

        this.lightboxMedia.innerHTML = `
            ${currentMedia.image ? `
                <img src="./assets/images/${this.photographer.name}/${currentMedia.image}" alt="${currentMedia.alt}">` :
                `<video controls aria-label="${currentMedia.alt}"><source src="./assets/images/${this.photographer.name}/${currentMedia.video}" type="video/mp4" autoplay></video>`}

            <figcaption>${currentMedia.title}</figcaption>
        `;
    }

    closeLightbox() {
        this.lightboxWrapper.style.display = 'none';
        this.lightboxMedia.innerHTML = '';
    }

    nextMedia() {
        this.currentIndex++;
        if (this.currentIndex > this.mediasList.length - 1) this.currentIndex = 0;
        this.lightboxTemplate();
        this.showActiveBtn(this.btnNext);
    }

    previousMedia() {
        this.currentIndex--;
        if (this.currentIndex < 0) this.currentIndex = this.mediasList.length - 1;
        this.lightboxTemplate();
        this.showActiveBtn(this.btnPrevious);
    }

    showActiveBtn(btn) {
        btn.classList.add('active');
        setTimeout(() => btn.classList.remove('active'), 100);
    }
}