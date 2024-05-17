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
};


// export default class Api {
//     constructor() {
//         this.baseUrl = '../Front-End-Fisheye/'; // Ajoute ici le chemin vers ton fichier JSON si nécessaire
//     }

//     // Méthode pour récupérer les données du fichier JSON
//     async fetchData() {
//         try {
//             const response = await fetch(`${this.baseUrl}data/photographers.json`); // Assure-toi de mettre le bon chemin vers ton fichier JSON
//             return await response.json();
//         } catch (error) {
//             console.error('Une erreur est survenue lors de la récupération des données :', error);
//         }
//     }

//     // Méthode pour récupérer les données des photographes
//     async fetchPhotographers() {
//         const data = await this.fetchData();
//         return data ? data.photographers : [];
//     }

//     // Méthode pour récupérer les données des médias
//     async fetchMedia() {
//         const data = await this.fetchData();
//         return data ? data.media : [];
//     }
// }
