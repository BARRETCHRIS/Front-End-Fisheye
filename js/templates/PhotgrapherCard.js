class PhotographerCard {
    constructor(photographer) {
        this._photographer = photographer
    }

    createPhotographerCard() {
        const $wrapper = document.createElement('article')
        $wrapper.classList.add('photographer-card-wrap')

        const photographerCard = `
            <a class="photographer_link" target="blank" href="photographer.html?id=${this._photographer.id}">
                <div class="portrait_wrap">
                    <img src="../assets/photographers/${this._photographer.portrait}" class="photographer_portrait "alt="portrait de ${this._photographer.name}" aria-label="cliquer ou taper entrée pour ouvrir la galerie de ${this._photographer.name}">
                </div>
                <h2 class="photographer_name" aria-label="${this._photographer.name}">${this._photographer.name}</h2>
            </a>
            <p class="city_wrap">${this._photographer.city}, ${this._photographer.country}</p>
            <p class="tagline">${this._photographer.tagline}</p>
            <p class="price">${this._photographer.price} €/jour</p>
        `
        
        $wrapper.innerHTML = photographerCard
        return $wrapper
    }
}