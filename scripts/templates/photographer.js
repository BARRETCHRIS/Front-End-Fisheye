function photographerTemplate(data) {
    const { name, portrait, city, tagline, price} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const linkPhotographer = document.createElement("a");
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        const cityWrap = document.createElement("p");
        const taglineWrap = document.createElement("p");
        const priceWrap = document.createElement("p");   

        h2.textContent = name;
        cityWrap.textContent = city;
        taglineWrap.textContent = tagline;
        priceWrap.textContent = `${price} €/jour`;

        linkPhotographer.setAttribute("href", "photographer.html")
        linkPhotographer.appendChild(img, h2);
        linkPhotographer.appendChild(h2);

        article.appendChild(linkPhotographer);
        article.appendChild(cityWrap);
        article.appendChild(taglineWrap);
        article.appendChild(priceWrap);


        return (article);
    } 
    return { name, picture, city, tagline, price, getUserCardDOM }
}