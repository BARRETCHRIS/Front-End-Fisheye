function photographerTemplate(data) {
    const {name, id, portrait, city, tagline, price} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const linkPhotographer = document.createElement("a");
        // Ajout de la classe pour les liens de photographe
        linkPhotographer.classList.add('photographer-link');
        linkPhotographer.setAttribute("target", "_blank");
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", `portrait de ${name}`);
        img.setAttribute("aria-label", `${name}, cliquer ou taper entrer pour ouvrir la galerie du photographe`);
        const h2 = document.createElement( 'h2' );
        const cityWrap = document.createElement("p");
        cityWrap.classList.add("city_wrap");        
        const taglineWrap = document.createElement("p");
        const priceWrap = document.createElement("p");  

        h2.textContent = name;
        cityWrap.textContent = city;
        taglineWrap.textContent = tagline;
        priceWrap.textContent = `${price} €/jour`;

        linkPhotographer.setAttribute("href", `photographer.html?id=${id}`)
        linkPhotographer.appendChild(img);
        linkPhotographer.appendChild(h2);

        article.appendChild(linkPhotographer);
        article.appendChild(cityWrap);
        article.appendChild(taglineWrap);
        article.appendChild(priceWrap);

        return (article);
    } 
    return { name, picture, city, tagline, price, getUserCardDOM }
}