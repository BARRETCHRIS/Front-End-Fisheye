import LikesManager from "./LikesManager.js ";
import LightboxManager from "./LightboxManager.js ";

class FilterManager {
    constructor() {
        this.filterMenu = document.querySelector(".dropdown_content");
        this.filterMenuButton = document.querySelector(".btn_drop");
        this.filterButtons = document.querySelectorAll(".dropdown_content button");

        this.filterMenuButton.addEventListener("click", () => {
            this.toggleFilterMenu();
        });
    }

    toggleFilterMenu() {
        const isExpanded = this.filterMenuButton.getAttribute("aria-expanded") === "true" || false;
        this.filterMenuButton.setAttribute("aria-expanded", !isExpanded);
        this.filterMenu.classList.toggle("curtain_effect");
        document.querySelector(".fa-chevron-up").classList.toggle("rotate");

        const newAriaHiddenValue = this.filterMenu.classList.contains("curtain_effect") ? "false" : "true";
        this.filterMenu.setAttribute("aria-hidden", newAriaHiddenValue);

        const newTabIndexValue = this.filterMenu.classList.contains("curtain_effect") ? "0" : "-1";
        this.filterButtons.forEach(button => button.setAttribute("tabindex", newTabIndexValue));
    }
}

class MediaFilteredManager {
    constructor(mediasTemplate) {
        this.mediasTemplate = mediasTemplate;
        this.currentFilter = document.querySelector('#current_filter');
        this.allFilters = Array.from(document.querySelectorAll('.dropdown_content li button'));

        this.allFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                this.filterMedia(filter.textContent);
            });
        });
    }

    filterMedia(filterValue) {
        this.currentFilter.textContent = filterValue;
        let sortedMedias = this.mediasTemplate.medias.slice(); // Copy the array

        switch (filterValue) {
            case 'Titre':
                sortedMedias.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'Popularité':
                sortedMedias.sort((a, b) => b.likes - a.likes);
                break;
            case 'Date':
                sortedMedias.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
        }

        this.mediasTemplate.medias = sortedMedias;
        this.mediasTemplate.renderMedias();

        const lightbox = new LightboxManager(this.mediasTemplate);
        lightbox.initialize();
        new LikesManager();

        const mediaElements = document.querySelectorAll('.gallery_card');
        mediaElements.forEach((media, index) => {
            setTimeout(() => {
                media.classList.add('animeCard');
            }, 100 * index);
        });
    }
}

export { FilterManager, MediaFilteredManager };
