//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers() {
    const answer = await fetch("data/photographers.json"); 
    const media= await answer.json();
    // et bien retourner le tableau photographers seulement une fois récupéré
    return media;    
}


    