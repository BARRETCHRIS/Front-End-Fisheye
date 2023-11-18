class MediaCardGallery {
    constructor(media, photographer) {
        this._media = media;
        this._photographer = photographer;
    }

    createMediaCardGallery() {
        const $articleWrap = document.createElement('div');
        $articleWrap.classList.add('media_card');

        let mediaContent;

        if (this._media.image) {
            // Si c'est une image
            mediaContent = `
                <img class="mediaImg" src="assets/images/${this._photographer.name}/${this._media.image}" alt="${this._media.title}" aria-label="Cliquer pour ouvrir le carrousel des œuvres">
            `;
        } else if (this._media.video) {
            // Si c'est une vidéo
            mediaContent = `
                <video class="mediaImg" aria-label="Cliquer pour ouvrir le carrousel des œuvres et lire la vidéo">
                    <source src="assets/images/${this._photographer.name}/${this._media.video}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
        }

        const mediaCard = `
            ${mediaContent}
            <div class="media_info">
                <h2 class="media_title">${this._media.title}</h2>
                <p class="likes">
                    <span class="likes_nbr" aria-label="${this._media.likes} likes reçus">${this._media.likes}</span>
                    <i class="fa-solid fa-heart"></i>
                </p>
                <p class="media_date" aria-label="Créé le ${this._media.date}">${this._media.date}</p>
            </div>
        `;

        $articleWrap.innerHTML = mediaCard;

        return $articleWrap;
    }
}
