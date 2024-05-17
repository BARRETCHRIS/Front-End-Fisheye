export default class GalleryHeader {
    constructor(photographer) {
        // Stocker les informations sur le photographe et l'élément cible
        this.photographer = photographer
        this.wapperGalleryHeader = document.getElementById('photographHeader');
    }

    // Méthode pour créer la carte du photographe dans la galerie
    renderCard() {
        // Nom du Header Contact Form
        const formName = document.querySelector(".modal_form_name");
        formName.textContent = this.photographer.name;
        // Modèle HTML de la carte du photographe
        const photographHeaderCard = `
            <div class="surname" aria-label="Informations sur le photographe" tabindex="0">
                <h1 class="photographer_name" aria-label="${this.photographer.name}">${this.photographer.name}</h1>
                <p class="city_wrap">${this.photographer.city}, ${this.photographer.country}</p>
                <p class="tagline">${this.photographer.tagline}</p>
            </div>
            <div class="btn-wrap" aria-label="Bouton de contact">
                <!-- <button class="contact_button" aria-label="Taper entrée pour ouvrir le formulaire de contact" tabindex="0">Contactez-moi</button> -->
                <button class="btn btn_cta contact_button" type="button" aria-label="Open contact form">Contactez-moi</button>
            </div>
            <div class="portrait_wrap">
                <img src="./assets/photographers/${this.photographer.portrait}" class="photographer_portrait "alt="portrait de ${this.photographer.name}" aria-label="Portrait de ${this.photographer.name}">
            </div> 
        `;

        // Insére le HTML directement dans le wrapper à la fin
        this.wapperGalleryHeader.insertAdjacentHTML('beforeend', photographHeaderCard);
    }
}


 // <span class="total_likes" aria-label="${this._photographer.name} totalise un nombre de likes de : ${totalLikes}" tabindex="0">
                //     <span id="totalLikesNbre" tabindex="0">${totalLikes}</span>
                //     <i class="fa-solid fa-heart"></i>
                // </span>