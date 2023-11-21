class MediaCardGallery {
    constructor(media, photographer) {
        this._media = media;
        this._photographer = photographer;
    }

    createMediaCardGallery() {
        const $articleWrap = document.createElement('div');
        $articleWrap.classList.add('media_card');
        $articleWrap.setAttribute('tabindex', '0');
        $articleWrap.dataset.mediaId = this._media.id; // Ajoute cet attribut pour identifier le média

        let mediaContent = '';

        if (this._media.image) {
            // Si c'est une image
            mediaContent = `
                <img class="mediaImg" src="assets/images/${this._photographer.name}/${this._media.image}" alt="${this._media.title}" aria-label="Cliquer pour ouvrir le carrousel des œuvres" tabindex="0">
            `;
        } else if (this._media.video) {
            // Si c'est une vidéo
            mediaContent = `
                <video src="assets/images/${this._photographer.name}/${this._media.video}" type="video/mp4" class="mediaImg" aria-label="Cliquer pour ouvrir le carrousel des œuvres et lire la vidéo" tabindex="0"></video>
            `;
        }

        const mediaCard = `
            ${mediaContent}
            <div class="media_info">
                <h2 class="media_title" tabindex="0">${this._media.title}</h2>
                <p class="likes" data-media-id="${this._media.id}" data-liked="false">
                    <span class="likes_nbr" id="likesNbr-${this._media.id}" aria-label="${this._media.likes} likes reçus" tabindex="0">${this._media.likes}</span>
                    <i class="fa-solid fa-heart"></i>
                </p>
                <p class="media_date" aria-label="Créé le ${this._media.date}" tabindex="0">${this._media.date}</p>
            </div>
        `;

        $articleWrap.innerHTML = mediaCard;
       console.log(typeof(this._media.likes));
        return $articleWrap;
    }
}
