let mediaLikesArray;

async function getMediaInfo() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const photographerId = urlParams.get('id');

        if (photographerId) {
            const photographerApi = new PhotographerApi('/data/photographers.json');
            const medias = await photographerApi.getMediaByPhotographerId(photographerId);

            // Méthode map pour créer un nouveau tableau avec les informations nécessaires
            mediaLikesArray = medias.map(media => {
                return { id: media.id, likes: media.likes, liked: false };
            });

        } else {
            console.error('Photographer ID not found in the URL');
        }
    } catch (error) {
        console.error('An error occurred while getting media information:', error);
    }
}

function toggleLike(mediaId) {
    const media = mediaLikesArray.find(media => media.id === mediaId);

    if (media) {
        media.likes += media.liked ? -1 : 1;
        media.liked = !media.liked;

        // Met à jour l'affichage des likes sur la page
        const likesElement = document.getElementById(`likesNbr-${media.id}`);
        likesElement.textContent = media.likes;

        // TODO: Ajoutez ici la logique pour envoyer les likes au serveur (si nécessaire)
    }
}

getMediaInfo();
