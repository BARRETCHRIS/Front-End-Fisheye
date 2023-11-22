let mediaLikesArray = [];
let totalLikes = 0;

async function getMediaInfo() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('id');

    if (photographerId) {
      const photographerApi = new PhotographerApi('/data/photographers.json');
      const photographer = await photographerApi.getPhotographerById(photographerId)
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

    // Recalcule la somme totale des likes à partir du tableau mis à jour
    totalLikes = calculateTotalLikes();
    console.log(totalLikes);

    // TODO: Ajoutez ici la logique pour envoyer les likes au serveur (si nécessaire)
  }
}

function calculateTotalLikes() {
  // Utilise la méthode reduce pour calculer la somme totale des likes
  return mediaLikesArray.reduce((total, media) => total + media.likes, 0);
}


getMediaInfo();
