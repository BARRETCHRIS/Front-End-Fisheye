function photographerGalleryTemplate(data){
    const {name, city, tagline, portrait} = data;

    const picture = `assets/photographers/${portrait}`;

    function getPhotographCardDOM(){
        const surnameWrap = document.createElement('div');
        surnameWrap.classList.add(surname);
        const portraitWrap = document.createElement('div');
        portraitWrap.classList.add(portrait);
        const h1 = document.createElement('h1');
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        const cityWrap = document.createElement("p");
        const taglineWrap = document.createElement("p");

        h2.textContent = name;
        cityWrap.textContent = city;
        taglineWrap.textContent = tagline;

        surnameWrap.appendChild(h1);
        surnameWrap.appendChild(cityWrap);
        surnameWrap.appendChild(taglineWrap);

        portraitWrap.appendChild(img);

        return(surnameWrap + portraitWrap);    
    }

    return {name, city, tagline, portrait, getPhotographCardDOM}
}