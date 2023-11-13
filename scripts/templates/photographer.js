function photographerTemplate(data) {
    const {name, id, portrait, city, tagline, price} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const linkPhotographer = document.createElement("a");
        // Ajout de l'attribut aria-labelledby pour référencer l'ID de l'élément h2
        linkPhotographer.setAttribute("aria-labelledby", `photographer-name-${id}`);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", `portrait de ${name}`);
        img.setAttribute("aria-label", `${name}, ${city} - ${tagline}, ${price} €/jour`);
        const h2 = document.createElement( 'h2' );
        h2.setAttribute("id", `photographer-name-${id}`);
        const cityWrap = document.createElement("p");
        const taglineWrap = document.createElement("p");
        const priceWrap = document.createElement("p"); 

        // Ajout d'un texte descriptif pour informer les utilisateurs
        const description = document.createElement("span");
        description.setAttribute("id", `photographer-description-${id}`);
        description.textContent = `Cliquez pour ouvrir la galerie de ${name}`;  

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