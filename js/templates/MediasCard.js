export default class mediasCard {
    constructor(photographer, medias) {
        this.photographer = photographer;
        this.medias = medias;
    }

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
    }
}