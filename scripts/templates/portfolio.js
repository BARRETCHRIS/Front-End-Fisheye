function photographerGalleryTemplate(data){
    const {name, city, tagline, portrait, title, likes, image, video,} = data;
    console.log(data);
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

    function getGalleryCardDOM(){

    }
    
    return {name, city, tagline, portrait, getPhotographCardDOM}
}