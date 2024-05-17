export default class mediasCard {
    constructor(photographer, medias) {
        this.photographer = photographer;
        this.medias = medias;
    };

   renderMedias() {
        const profilePageContent = document.getElementById('galleryWrap');
        const content = `
            <section class="gallery">
                ${this.medias.map(media => {
            const mediaContent = media.image
                ? ` <img class="media" src="./assets/images/${this.photographer.name}/${media.image}" alt="${media.alt}">`
                : ` <video class="media" aria-label="${media.alt}">
                        <source src="./assets/images/${this.photographer.name}/${media.video}" type="video/mp4">
                    </video>`;
            return `
                    <article class="gallery_card">                           
                        <a href="#" data-media=${media.id} role="link" aria-label="View media large">
                            <figure class="media_wrap">${mediaContent}</figure>
                        </a>
                        <figcaption class="media_caption">
                            <h2>${media.title}</h2>
                                <div role="group" aria-label="Like button and number of likes">
                                    <span class="nbLike">${media.likes}</span> 
                                    <button class="btn_like" type="button" aria-label="Like" data-id="${media.id}">
                                        <span class="fas fa-heart" aria-hidden="true"></span>
                                    </button> 
                                </div>
                        </figcaption>
                    </article>
                `;
        }).join("")}
            </section >
            <aside class="infos_bottom">
                <p class="photographer_Likes">
                    <span class="photographer_likes_count"></span>
                    <span class="fas fa-heart" aria-hidden="true"></span>
                </p>
                <span>${this.photographer.price}€ / jour</span>
            </aside>
        `;

        profilePageContent.innerHTML = content;
        return content;
    };
};


// // Classe représentant la carte média dans la galerie
// export default class MediaCard {
//     constructor(media, photographer) {
//         // Stocke les informations sur le média et le photographe associé
//         this.media = media;
//         this.photographer = photographer;
//     }

//     // Méthode pour créer la carte média dans la galerie
//     renderMediaCard() {
//         // Crée un conteneur <article> pour la carte média
//         const articleWrap = document.createElement('article');
//         articleWrap.classList.add('media_card');
//         // articleWrap.setAttribute('tabindex', '0');
//         articleWrap.dataset.mediaId = this.media.id; // Ajoute cet attribut pour identifier le média

//         let mediaContent = '';

//         // Génére le contenu média en fonction du type (image ou vidéo)
//         if (this.media.image) {
//             // Si c'est une image
//             mediaContent = `
//                 <img class="mediaImg" src="assets/images/${this._photographer.name}/${this.media.image}" alt="${this.media.title}" aria-label="Cliquer pour ouvrir le carrousel des œuvres" tabindex="0">
//             `;
//         } else if (this.media.video) {
//             // Si c'est une vidéo
//             mediaContent = `
//                 <video src="assets/images/${this._photographer.name}/${this.media.video}" type="video/mp4" class="mediaImg" aria-label="Cliquer pour ouvrir le carrousel des œuvres et lire la vidéo" tabindex="0"></video>
//             `;
//         }

//         // Modèle HTML pour la carte média
//         const mediaCard = `
//             ${mediaContent}
//             <div class="media_info">
//                 <h2 class="media_title" tabindex="0">${this.media.title}</h2>
//                 <p class="likes" data-media-id="${this.media.id}" data-liked="false">
//                     <span class="likes_nbr" id="likesNbr-${this.media.id}" aria-label="${this.media.likes} likes reçus" tabindex="0">${this.media.likes}</span>
//                     <i class="fa-solid fa-heart"></i>
//                 </p>
//                 <p class="media_date" aria-label="Créé le ${this.media.date}" tabindex="0">${this.media.date}</p>
//             </div>
//         `;

//         // Injecte le HTML généré dans le conteneur <div>
//         articleWrap.innerHTML = mediaCard;
//         // Retourne le conteneur <div> contenant la carte média
//         return articleWrap;
//     }
// }