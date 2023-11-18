class photographCardGallery {
    constructor(photographer, targetElement) {
        this._photographer = photographer
        this.$wrapper = targetElement;
    }

    createPhotographCardGallery() {
        // const $cardContainer = document.createElement('div');
        // $cardContainer.classList.add('photograph-card');

        const $surnameWrap = document.createElement('div');
        $surnameWrap.classList.add('surname');
        const $btnContactWrap = document.createElement('div');
        $btnContactWrap.classList.add('btn-wrap');
        const $portraitWrap = document.createElement('div');
        $portraitWrap.classList.add('portrait');


        const surnameCard = `   
            <h1 class="photographer_name" aria-label="${this._photographer.name}">${this._photographer.name}</h1>
            <p class="city_wrap">${this._photographer.city}, ${this._photographer.country}</p>
            <p class="tagline">${this._photographer.tagline}</p>
        `

        const ContactWrap = `
            <button class="contact_button" onclick="displayModal()" aria-label="Taper entrée pour ouvrir le formulaire de contact">Contactez-moi</button>
        `

        const portraitCard = `
            <div class="portrait_wrap">
                <img src="../assets/photographers/${this._photographer.portrait}" class="photographer_portrait "alt="portrait de ${this._photographer.name}" aria-label="cliquer ou taper entrée pour ouvrir la galerie de ${this._photographer.name}">
            </div>
        `
        $surnameWrap.innerHTML = surnameCard;
        $btnContactWrap.innerHTML = ContactWrap;
        $portraitWrap.innerHTML = portraitCard;

        // Ajoutez les nouveaux éléments au this.$wrapper existant
        // $cardContainer.appendChild($surnameWrap);
        // $cardContainer.appendChild($btnContactWrap);
        // $cardContainer.appendChild($portraitWrap);

        // this.$wrapper.appendChild($cardContainer);
        // return $cardContainer;

        // Ajoutez les nouveaux éléments directement à $wrapper
        this.$wrapper.appendChild($surnameWrap);
        this.$wrapper.appendChild($btnContactWrap);
        this.$wrapper.appendChild($portraitWrap);

        // Retourne le premier élément ajouté pour référence
        return $surnameWrap;
    }
}