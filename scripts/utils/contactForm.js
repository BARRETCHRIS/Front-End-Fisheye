function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";

    getPhotographerData(photographerId);
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

async function getPhotographerData(photgapherId) {
    const answer = await fetch("data/photographers.json"); 
    const data= await answer.json();

    const photographer = data.photographers.find(p => p.id === parseInt(photographerId));

    const contactName = document.getElementById("contact_name");
    if (contactName) {
        contactName.textContent = photographer.name;
    };
};
