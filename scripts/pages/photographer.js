// Déclaration des variables globales
let originMediaArray = [];
let filteredMediaArray = [];
let photographTemplate = '';

// Récupération de l'ID du photographe depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

// Fonction pour récupérer les données du photographe
async function getPhotographerData(photographerId) {
  // Récupération des données depuis le fichier JSON
  const response = await fetch("data/photographers.json");
  const data = await response.json();

  // Filtrer le photographe et ses médias en fonction de l'ID
  const photographer = data.photographers.find(p => p.id === parseInt(photographerId));
  const medias = data.media.filter(m => m.photographerId === parseInt(photographerId));

  return { photographer, medias };
}

// Fonction pour récupérer la valeur du filtre depuis localStorage
function getSelectedFilter() {
  return localStorage.getItem('selectedFilter') || 'none';
}

// Fonction pour définir l'attribut selected pour le filtre
function setSelectedFilter() {
  const selectedFilter = getSelectedFilter();
  const filterChoise = document.getElementById('filterChoise');

  for (let i = 0; i < filterChoise.options.length; i++) {
    if (filterChoise.options[i].value === selectedFilter) {
      filterChoise.options[i].selected = true;
      break;
    }
  }
}

// Fonction pour sauvegarder le filtre sélectionné dans localStorage
function saveSelectedFilter() {
  const filterChoise = document.getElementById('filterChoise');
  const selectedFilter = filterChoise.value;
  localStorage.setItem('selectedFilter', selectedFilter);
}

// Fonction pour réinitialiser le filtre dans localStorage
function resetFilter() {
  localStorage.removeItem('selectedFilter');
}

// Fonction d'initialisation
async function init() {
  // Appel de la fonction pour réinitialiser le filtre dans localStorage
  resetFilter();

  // Récupération des données du photographe et initialisation des variables globales
  const { photographer, medias } = await getPhotographerData(photographerId);

  // Copie des tableaux pour éviter les effets de bord
  originMediaArray = [...medias];
  filteredMediaArray = [...originMediaArray];
  photographTemplate = photographerGalleryTemplate(photographer);

  // Récupération de la valeur du filtre et configuration de l'attribut selected
  setSelectedFilter();

  // Ajout du contenu du photographe dans le header
  const photographHeader = document.querySelector(".photograph-header");
  photographHeader.appendChild(photographTemplate.getPhotographCardDOM());

  // Gestionnaire d'événement pour la galerie
  const gallery = document.querySelector('.gallery');
  gallery.addEventListener('click', handleGalleryClick);

  // Gestionnaire d'événement pour le changement de filtre
  const filterChoise = document.getElementById('filterChoise');
  filterChoise.addEventListener('change', () => {
    saveSelectedFilter();
    handleFilterChange();
  });

  // Applique le filtre initial
  filterMedias();

  // Affiche la galerie initiale
  renderGallery();
}


// Gestionnaire d'événement pour le clic sur la galerie
function handleGalleryClick(event) {
  const targetMediaCard = event.target.closest('.media-card');
  if (targetMediaCard) {
    const index = parseInt(targetMediaCard.getAttribute('data-index'));
    openMediaInLightbox(index);
  }
}

// Gestionnaire d'événement pour le changement de filtre
function handleFilterChange() {
  // Applique le filtre sélectionné et met à jour la galerie
  filterMedias();
  renderGallery();
}

// Fonction pour filtrer les médias en fonction du filtre sélectionné
function filterMedias() {
  const filterValue = document.getElementById('filterChoise').value;

  // Trie les médias en fonction du filtre
  filteredMediaArray.sort((a, b) => {
    switch (filterValue) {
      case 'option1':
        return b.likes - a.likes;
      case 'option2':
        return new Date(b.date) - new Date(a.date);
      case 'option3':
        return a.title.localeCompare(b.title);
      default:
        // Aucun filtre, réinitialise le tableau filtré
        filteredMediaArray = [...originMediaArray];
    }
  });
}

// Fonction pour afficher la galerie avec les médias filtrés
function renderGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';

  // Affiche chaque carte média dans la galerie
  filteredMediaArray.forEach((mediaItem, index) => {
    const mediaCard = photographTemplate.getGalleryCardDOM(mediaItem, index);
    gallery.appendChild(mediaCard);

    // Gestionnaire d'événement pour le clic sur les likes
    const likesElement = mediaCard.querySelector('.likes');
    const likesNbr = mediaCard.querySelector('.likes-nbr');
    likesElement.addEventListener('click', () => handleLikesClick(likesNbr));

    // Gestionnaire d'événement pour le clic sur une carte média
    mediaCard.addEventListener('click', () => openMediaInLightbox(mediaItem));


  });

  // Ajout du total des likes en bas de la galerie
  const totalLikesDOM = photographTemplate.getTotalLikesDOM(filteredMediaArray);
  gallery.appendChild(totalLikesDOM);
}

// Gestionnaire d'événement pour le clic sur les likes
function handleLikesClick(likesNbr) {
  let likesCount = parseInt(likesNbr.textContent);
  likesCount++;
  likesNbr.textContent = likesCount;
}

// Appel de la fonction d'initialisation
init();


