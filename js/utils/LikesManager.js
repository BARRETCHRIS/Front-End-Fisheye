import { getPhotographerAndMediaById } from "../photographer.js";

export default class LikesManager {
    constructor() {
        this.likesElement = document.querySelector(".photographer_likes_count");
        this.allBtnLike = document.querySelectorAll(".btn_like");
        this.medias = [];
    }

    async initialize() {
        this.medias = (await getPhotographerAndMediaById()).medias;
        this.updateTotalLikes();
        this.allBtnLike.forEach(btn => {
            btn.addEventListener("click", () => {
                const media = this.medias.find(media => media.id == btn.dataset.id);

                !btn.classList.contains("liked") ? media.likes++ : media.likes--;

                btn.classList.toggle("liked");

                const likesElement = btn.previousElementSibling;
                likesElement.textContent = `${media.likes}`;

                this.updateTotalLikes();
            });
        });
    }

    updateTotalLikes() {
        const totalLikes = this.medias.reduce((acc, media) => acc + media.likes, 0);
        this.likesElement.textContent = `${totalLikes}`;
    }
}