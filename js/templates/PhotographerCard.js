export default class PhotographerCard {
    constructor(photographer) {
        this.photographer = photographer;
    }

    renderCard() {
        const wrapperCard = document.createElement('articles');
        wrapperCard.classList.add('photographer_card_wrap');
        wrapperCard.setAttribute('aria-label', 'Carte de présentation de ${this.photographer.name}');

        const photographerCardContent = `
            <a class="photographer_link" target="blank" href="photographer.html?id=${this.photographer.id}" role="link" aria-label="Voir le profil de ${this.photographer.name}">
                <div class="portrait_wrap">
                    <img src="assets/photographers/${this.photographer.portrait}" class="photographer_portrait "alt="portrait de ${this.photographer.name}" aria-label="cliquer ou taper entrée pour ouvrir la galerie de ${this.photographer.name}">
                </div>
                <h2 class="photographer_name" aria-label="${this.photographer.name}">${this.photographer.name}</h2>
            </a>
            <p class="city_wrap">${this.photographer.city}, ${this.photographer.country}</p>
            <p class="tagline">${this.photographer.tagline}</p>
            <p class="price">${this.photographer.price} €/jour</p>
        `;
        
        wrapperCard.innerHTML = photographerCardContent;
        return wrapperCard
    }
}