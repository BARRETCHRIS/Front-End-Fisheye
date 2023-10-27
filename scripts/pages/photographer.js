const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

// console.log(photographerId)

async function getPhotographerData(photgapherId) {
    const answer = await fetch("data/photographers.json"); 
    const data= await answer.json();

    const photographers = data.photographers.find(p => p.id === parseInt(photographerId));
    const media = data.media.filter(m => m.photographerId === parseInt(photographerId));


   
 
    //console.log(media);

    return { photographers, media};    
}

// async function init() {
//     const {photographers} = await getPhotographerData(photographerId);
    

//     const photographTemplate = photographerGalleryTemplate(photographers);
//     const cardDOM = photographTemplate.getPhotographCardDOM();
    

//     const photographHeader = document.querySelector(".photograph-header");
//     photographHeader.appendChild(cardDOM);

//     const gallery = document.querySelector('.gallery');
//     media.forEach((media) => {
//         const mediaWrap = document.createElement('div');
//         const img = document.createElement('img');
//         img.setAttribute("src", `../assets/images/${photographers.name}/${media.image} || ${media.video}`)

//         mediaWrap.appendChild(img);
//         gallery.appendChild(mediaWrap);
       
//     });
    

//     //console.log({ photographers, media });

// }

async function init() {
    const { photographers, media } = await getPhotographerData(photographerId);

    const photographTemplate = photographerGalleryTemplate(photographers);
    const cardDOM = photographTemplate.getPhotographCardDOM();

    const photographHeader = document.querySelector(".photograph-header");
    photographHeader.appendChild(cardDOM);

    const gallery = document.querySelector('.gallery');
    media.forEach((mediaItem) => {
        const mediaWrap = document.createElement('div');
        const img = document.createElement('img');
        img.setAttribute("src", `../assets/images/${photographers.name}/${mediaItem.image}`);

        mediaWrap.appendChild(img);
        gallery.appendChild(mediaWrap);
    });
}


init();