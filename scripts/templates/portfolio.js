function photographerGalleryTemplate(data){
    const {name, city, tagline, portrait} = data;
    const picture = `assets/photographers/${portrait}`;

    function getPhotographCardDOM(){

        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');

        const surnameWrap = document.querySelector('.surname');
        const btnWrap = document.querySelector('.btn-wrap');
        const portraitWrap = document.querySelector('.portrait');


        const h1 = document.createElement('h1');
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        const cityWrap = document.createElement("p");
        const taglineWrap = document.createElement("p");

        h1.textContent = name;
        cityWrap.textContent = city;
        taglineWrap.textContent = tagline;

        surnameWrap.appendChild(h1);
        surnameWrap.appendChild(cityWrap);
        surnameWrap.appendChild(taglineWrap);

        portraitWrap.appendChild(img);

        cardContainer.appendChild(surnameWrap);
        cardContainer.appendChild(btnWrap);
        cardContainer.appendChild(portraitWrap);

        return cardContainer;    
    }

    function getGalleryCardDOM(mediaItem) {
    const mediaWrap = document.createElement('div');
    mediaWrap.classList.add('media-card');

    const mediaInfoWrap = document.createElement('div');
    mediaInfoWrap.classList.add('media-info');

    const mediaTitle = document.createElement('h2');
    mediaTitle.textContent = mediaItem.title;

    const mediaLikes = document.createElement('p');
    mediaLikes.innerHTML = `${mediaItem.likes} <i class="fa-solid fa-heart"></i>`;

    const mediaDate = mediaItem.date;

    if (mediaItem.image) {
      const mediaImage = document.createElement('img');
      mediaImage.setAttribute('src', `../assets/images/${name}/${mediaItem.image}`);
      mediaWrap.appendChild(mediaImage);
    } else if (mediaItem.video) {
      const mediaVideo = document.createElement('video');
      mediaVideo.setAttribute('src', `../assets/images/${name}/${mediaItem.video}`);
      mediaVideo.setAttribute('controls', true);
      mediaWrap.appendChild(mediaVideo);
    }

    mediaInfoWrap.appendChild(mediaTitle);
    mediaInfoWrap.appendChild(mediaLikes);
    mediaWrap.appendChild(mediaInfoWrap);

    return mediaWrap;
  }
    
    return { name, city, tagline, portrait, getPhotographCardDOM, getGalleryCardDOM }

}