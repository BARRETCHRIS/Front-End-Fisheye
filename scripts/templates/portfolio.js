function photographerGalleryTemplate(data){
    const {name, city, tagline, portrait, price} = data;
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

    function getGalleryCardDOM(mediaItem, index) {
      const mediaWrap = document.createElement('div');
      mediaWrap.classList.add('media-card');
      mediaWrap.classList.add(`media-card-${index}`);
      mediaWrap.setAttribute('data-index', index);

      const mediaInfoWrap = document.createElement('div');
      mediaInfoWrap.classList.add('media-info');

      const mediaTitle = document.createElement('h2');
      mediaTitle.classList.add('media-title');
      mediaTitle.textContent = mediaItem.title;

      const mediaLikes = document.createElement('p');
      mediaLikes.classList.add('likes');
      const likesText = document.createElement('span');
      likesText.classList.add('likes-nbr');
      likesText.textContent = mediaItem.likes;
      const heartIcon = document.createElement('i');
      heartIcon.classList.add('fa-solid', 'fa-heart');
      mediaLikes.appendChild(likesText);
      mediaLikes.appendChild(heartIcon);
      
      const mediaDate = document.createElement('p');
      mediaDate.classList.add('media-date');
      mediaDate.textContent = mediaItem.date;

      if (mediaItem.image) {
        const mediaImage = document.createElement('img');
        mediaImage.setAttribute('src', `assets/images/${name}/${mediaItem.image}`);
        mediaWrap.appendChild(mediaImage);
      } else if (mediaItem.video) {
        const mediaVideo = document.createElement('video');
        mediaVideo.setAttribute('src', `assets/images/${name}/${mediaItem.video}`);
        mediaVideo.setAttribute('controls', true);
        mediaWrap.appendChild(mediaVideo);
      }

      mediaInfoWrap.appendChild(mediaTitle);
      mediaInfoWrap.appendChild(mediaLikes);
      mediaInfoWrap.appendChild(mediaDate);
      mediaWrap.appendChild(mediaInfoWrap);

      return mediaWrap;
  }

  function getTotalLikesDOM(media) {

    const totalLikes = media.reduce((total, mediaItem) => total + mediaItem.likes, 0);

    const infosBottomPage = document.createElement('div');
    infosBottomPage.classList.add('infos-bottom');
    const totalLikesWrap = document.createElement('span');
    totalLikesWrap.classList.add('total-likes');
    totalLikesWrap.innerHTML = `${totalLikes} <i class="fa-solid fa-heart"></i>`;
    const bottomPriceWrap = document.createElement('span');
    bottomPriceWrap.classList.add('bottom-price');
    bottomPriceWrap.textContent = `${price}€ /jour`;

    infosBottomPage.appendChild(totalLikesWrap);
    infosBottomPage.appendChild(bottomPriceWrap);

    return infosBottomPage;
  }
    
  return { name, city, tagline, portrait, price, getPhotographCardDOM, getGalleryCardDOM, getTotalLikesDOM }

}

