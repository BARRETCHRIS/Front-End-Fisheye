class OrderGalleryFactory {
    // constructor(orderChoise, medias) {
    //     this._orderChoise = orderChoise;
    //     this._medias = medias;
    // }

    constructor(choise, medias) {
        this._choise = choise;
        this._medias = medias;
    }

    orderMedias() {
        switch (this._choise) {
            case 'option1':
                // Trier par popularité
                this._medias.sort((a, b) => b.likes - a.likes);
                break;
            case 'option2':
                // Trier par date
                this._medias.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'option3':
                // Trier par titre
                this._medias.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                // Pas de filtre
                break;
        }
        
        return this._medias;
    }
}

// Exports
// export default OrderGalleryFactory;