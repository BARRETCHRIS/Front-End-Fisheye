export default class Api {//Définit une classe Api.
    /**
     * 
     * @param {string} url 
     */

    constructor(url){
        this.url = url;//Le constructeur prend une URL en paramètre et initialise la propriété _url de l'instance de la classe avec cette URL.
    }
    async get(){ //La méthode get utilise fetch pour récupérer les données à partir de l'URL spécifiée.
        try{
            const response = await fetch(this.url);
            const data = await response.json();
            return data;//Retourne les données JSON obtenues.
        } catch(err){
            throw new Error(err); // En cas d'erreur, affiche un message dans la console
        }
    }
}
