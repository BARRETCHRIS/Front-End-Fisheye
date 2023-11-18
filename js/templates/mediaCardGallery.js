class MediaCardGallery {
    constructor(photographer) {
        this._photographer = photographer
        this._media = media
    }

    createMediaCardGallery() {
        const $articleWrap = document.createElement('div');
        $articleWrap.classList.add('media_card');


        const mediaCard = ` 
            <img class="mediaImg" src="assets/images/${this._photographer.name}/${this._media.title}" alt="${this._media.title}" aria-label="Cliquer pour ouvrir le carrousel des oeuvres">
            <div class="media_info">
                <h2 class="media_title">${this._media.title}</h2>
                <p class="likes">
                    <span class="likes_nbr" aria-lable="${this._media.likes} likes reçus">${this._media.likes}</span>
                    <i class="fa-solid fa-heart"></i>
                </p>
                <p class="media_date" aria-lable="Créer le ${this._media.date}">
            </div>    
        `
        $articleWrap.innerHTML = mediaCard
        
        // // Ajoutez les nouveaux éléments au this.$wrapper existant
        // this.$wrapper.appendChild($articleWrap);
        return this.$articleWrap
    }
}