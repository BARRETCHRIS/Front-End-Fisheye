class photographCardGallery {
    constructor(photographer, targetElement) {
        this._photographer = photographer
        this.$wrapper = targetElement;
    }

    createPhotographCardGallery() {
        const photographHeaderCard = `
            <div class="surname" aria-label="Informations sur le photographe" tabindex="0">
                <h1 class="photographer_name" aria-label="${this._photographer.name}">${this._photographer.name}</h1>
                <p class="city_wrap">${this._photographer.city}, ${this._photographer.country}</p>
                <p class="tagline">${this._photographer.tagline}</p>
            </div>
            <div class="btn-wrap" aria-label="Bouton de contact" tabindex="0">
                <button class="contact_button" onclick="displayModal()" aria-label="Taper entrée pour ouvrir le formulaire de contact">Contactez-moi</button>
            </div>
            <div class="portrait" aria-label="Portrait" tabindex="0">
                <div class="portrait_wrap">
                    <img src="../assets/photographers/${this._photographer.portrait}" class="photographer_portrait "alt="portrait de ${this._photographer.name}" aria-label="Portrait de ${this._photographer.name}">
                </div>
            </div>
            <div class="infos_bottom">
                <span class="total_likes" aria-label="${this._photographer.name} totalise un nombre de likes de :">
                    <span id="totalLikesNbre">${totalLikes}</span>
                    <i class="fa-solid fa-heart"></i>
                </span>
                <span class="bottom_price" aria-label="${this._photographer.name} prend ${this._photographer.price}€ par jour">
                    ${this._photographer.price}€ / jour
                </span>
            </div>    
        `;

        // Insérer le HTML directement dans le wrapper à la fin
        this.$wrapper.insertAdjacentHTML('beforeend', photographHeaderCard);
    }
}
