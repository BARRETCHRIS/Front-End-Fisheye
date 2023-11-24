// Classe représentant une fabrique d'ordre pour la galerie de médias
class OrderGalleryFactory {
    constructor(choise, medias) {
        // Stocke le choix de tri et la liste de médias à trier
        this._choise = choise;
        this._medias = medias;
    }

    // Méthode pour trier les médias en fonction du choix de l'utilisateur
    orderMedias() {
        switch (this._choise) {
            case 'option1':
                // Trie par popularité
                this._medias.sort((a, b) => b.likes - a.likes);
                break;
            case 'option2':
                // Trie par date
                this._medias.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'option3':
                // Trie par titre
                this._medias.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                // Pas de filtre
                break;
        }
        
        // Retourne la liste triée de médias
        return this._medias;
    }
}