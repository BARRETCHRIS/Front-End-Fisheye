async function getPhotographers() {
    const answer = await fetch("data/photographers.json"); 
    const photographers= await answer.json();
    
    return photographers;    
}

function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        //console.log(photographerModel);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
    
    // Ajout de la navigation au clavier
    const photographerLinks = document.querySelectorAll('.photographer-link');
    
    photographerLinks.forEach((link, index) => {
        link.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === 'Spacebar' || event.key === ' ') {
                // Déclencher l'événement de clic pour le lien sélectionné
                photographerLinks[index].click();
            }
        });
    });
}

init();

