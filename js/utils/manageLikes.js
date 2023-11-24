// Tableau global pour stocker les informations sur les likes de chaque média
let mediaLikesArray = [];
// Variable globale pour stocker le nombre total de likes
let totalLikes = 0;

// Fonction asynchrone pour récupérer les informations sur les médias du photographe
async function getMediaInfo() {
  // Récupérer l'ID du photographe depuis l'URL
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('id');

    if (photographerId) {
      // Crée une instance de la classe PhotographerApi pour récupérer les données du photographe
      const photographerApi = new PhotographerApi('/data/photographers.json');
      // Récupére les médias du photographe
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
  // Met à jour l'affichage du nombre total de likes sur la page
  let totalLikesNbre = document.getElementById('totalLikesNbre');
  totalLikes = calculateTotalLikes();
}

// Fonction pour calculer la somme totale des likes à partir du tableau global
function calculateTotalLikes() {
  // Utilise la méthode reduce pour calculer la somme totale des likes
  return mediaLikesArray.reduce((total, media) => total + media.likes, 0);
}

// Fonction pour basculer l'état d'un like pour un média spécifique
function toggleLike(mediaId) {
  // Trouve le média dans le tableau global
  const media = mediaLikesArray.find(media => media.id === mediaId);

  if (media) {
    // Augmente ou diminue le nombre de likes en fonction de l'état précédent    
    media.likes += media.liked ? -1 : 1;
    // Inverse l'état du like
    media.liked = !media.liked;

    // Met à jour l'affichage des likes sur la page
    const likesElement = document.getElementById(`likesNbr-${media.id}`);
    likesElement.textContent = media.likes;

    // Recalcule la somme totale des likes à partir du tableau mis à jour
    totalLikes = calculateTotalLikes();
    // Met à jour l'affichage du nombre total de likes sur la page
    this.totalLikesNbre.textContent = totalLikes;
    // console.log(totalLikes);

    // TODO: Ajoutez ici la logique pour envoyer les likes au serveur (si nécessaire)
  }
}

// Appel à la fonction pour récupérer les informations sur les médias lors du chargement de la page
getMediaInfo();
