// FORM Elements
const form = document.querySelector("form");

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let message = document.getElementById("message");

// REGEX
const regOnlyTxt = new RegExp('^([A-Za-zÀ-ÿ]{2,20})?([-]{0,1})?([A-Za-zÀ-ÿ]{2,20})$');
const regEmail = new RegExp('^[A-Za-z0-9.-_]+@[A-Za-z0-9.-_]+\\.[a-z]{2,4}$');

// Messages
const msgError = {
    inputEmpty: "Merci de renseigner ce champ",
    textOnly: "Merci d'inscrire au moins 2 lettres sans chiffres ou caractères spéciaux ",
    email: "Cette adresse email n'est pas valide, merci de corriger"
};
let divError = document.querySelectorAll(".error-msg");

async function getPhotographerData(photographerId) {
    try {
        const photographerApi = new PhotographerApi('/data/photographers.json');
        const photographer = await photographerApi.getPhotographerById(photographerId);

        const contactName = document.getElementById("contact_name");
        if (contactName) {
            contactName.textContent = photographer.name;
        }
    } catch (error) {
        console.error('An error occurred while fetching photographer data:', error);
    }
}

function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";

    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('id');
    getPhotographerData(photographerId);
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}