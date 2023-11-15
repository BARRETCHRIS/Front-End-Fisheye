let originMediaArray = [];
let filteredMediaArray = [];
//let photographTemplate ='';
// console.log(typeof photographTemplate)

const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

async function getPhotographerData(photgapherId) {
    const answer = await fetch("data/photographers.json"); 
    const data= await answer.json();

    const photographer = data.photographers.find(p => p.id === parseInt(photographerId));
    const medias = data.media.filter(m => m.photographerId === parseInt(photographerId));
    
    return {photographer, medias};    
}

async function init() {

  const { photographer, medias } = await getPhotographerData(photographerId);
  originMediaArray = Array.from(medias);
  filteredMediaArray = [...originMediaArray];
//suppréssion du const devant la varible qui suit pour régler le problème de retour de photographTemplate dans updateGallery
  photographTemplate = photographerGalleryTemplate(photographer);

  const cardDOM = photographTemplate.getPhotographCardDOM();

  const photographHeader = document.querySelector(".photograph-header");
  photographHeader.appendChild(cardDOM);
  
  const gallery = document.querySelector('.gallery');
  gallery.addEventListener('click', (event) => {
    const targetMediaCard = event.target.closest('.media-card');
    if (targetMediaCard) {
      const index = parseInt(targetMediaCard.getAttribute('data-index'));
      openMediaInLightbox(index);
    }
  });

  // Récupère la valeur du filtre depuis localStorage
  const selectedFilter = localStorage.getItem('selectedFilter') || 'none';
  const filterChoise = document.getElementById('filterChoise');
  
  // Définir l'attribut selected pour le filtre
  for (let i = 0; i < filterChoise.options.length; i++) {
    if (filterChoise.options[i].value === selectedFilter) {
      filterChoise.options[i].selected = true;
      break;
    }
  }

  // Applique le filtre initial
  filterMedias();

  medias.forEach((mediaItem, index) => {
    const mediaCard = photographTemplate.getGalleryCardDOM(mediaItem, index);
    gallery.appendChild(mediaCard);
  }); 

  const totalLikesDOM = photographTemplate.getTotalLikesDOM(medias);
  gallery.appendChild(totalLikesDOM);

  const mediaItems = gallery.querySelectorAll('.media-card');

  mediaItems.forEach(mediaItem => {
    const likesElement = mediaItem.querySelector('.likes');
    const likesNbr = mediaItem.querySelector('.likes-nbr');
    likesElement.addEventListener('click', () => {
      let likesCount = parseInt(likesElement.textContent);
      likesCount++;
      likesNbr.textContent = likesCount;
    });
  });

  mediaItems.forEach(mediaItem => {
    mediaItem.addEventListener('click', () => openMediaInLightbox(mediaItem));
  }); 

  return medias;
}

init();

// 
function filterMedias() {
  let filterValue = document.getElementById('filterChoise').value;

  filteredMediaArray.sort((a, b) => {
    switch (filterValue) {
      case 'option1':
        // popularité
        return b.likes - a.likes;
      case 'option2':
        // date
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      case 'option3':
        // titre
        return a.title.localeCompare(b.title);
      default:
        // aucun filtre
        filteredMediaArray = Array.from(originMediaArray);
    }
  });

  // return {filteredMediaArray, filterValue};
  updateGallery();
}

async function updateGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = ''; 

  filteredMediaArray.forEach((mediaItem, index) => {
    mediaCard = photographTemplate.getGalleryCardDOM(mediaItem, index);
    gallery.appendChild(mediaCard);

    const likesElement = mediaCard.querySelector('.likes');
    const likesNbr = mediaCard.querySelector('.likes-nbr');

    likesElement.addEventListener('click', () => {
      let likesCount = parseInt(likesNbr.textContent);
      likesCount++;
      likesNbr.textContent = likesCount;
    });

    mediaCard.addEventListener('click', () => openMediaInLightbox(mediaCard));
  });
}

document.getElementById('filterChoise').addEventListener('change', () => {
  filterMedias();
  updateGallery();

});  


// TEST de navigation au clavier pour le bouton select

// async function updateGallery() {
//     const gallery = document.querySelector('.gallery');
//     gallery.innerHTML = '';

//     filteredMediaArray.forEach((mediaItem, index) => {
//         mediaCard = photographTemplate.getGalleryCardDOM(mediaItem, index);
//         gallery.appendChild(mediaCard);

//         const likesElement = mediaCard.querySelector('.likes');
//         const likesNbr = mediaCard.querySelector('.likes-nbr');

//         likesElement.addEventListener('click', () => {
//             let likesCount = parseInt(likesNbr.textContent);
//             likesCount++;
//             likesNbr.textContent = likesCount;
//         });

//         mediaCard.addEventListener('click', () => openMediaInLightbox(mediaCard));
//     });
// }

// document.getElementById('filterChoise').addEventListener('keydown', function (event) {
//     const key = event.key;

//     switch (key) {
//         case 'Enter':
//             // Ouvrir le select en utilisant la méthode focus()
//             this.focus();
//             break;

//         case 'ArrowUp':
//         case 'ArrowDown':
//             event.preventDefault();
//             // Naviguer dans les options
//             navigateSelectOptions(key);
//             break;

//         default:
//             break;
//     }
// });

// document.querySelector('.contact_button').addEventListener('keydown', function (event) {
//     const key = event.key;

//     if (key === 'Enter') {
//         displayModal();
//     }
// });

// document.getElementById('filterChoise').addEventListener('change', () => {
//     filterMedias();
// });

// function navigateSelectOptions(direction) {
//     const select = document.getElementById('filterChoise');
//     const selectedIndex = select.selectedIndex;

//     if (direction === 'ArrowUp' && selectedIndex > 0) {
//         select.selectedIndex = selectedIndex - 1;
//     } else if (direction === 'ArrowDown' && selectedIndex < select.options.length - 1) {
//         select.selectedIndex = selectedIndex + 1;
//     }
// }
