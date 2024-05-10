// FORM Elements
const form = document.querySelector("form");

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let message = document.getElementById("message");

// REGEX
const regOnlyTxt = /^[A-Za-zÀ-ÿ\s'-]{2,20}$/;
const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

function handleEnterKeyPress(event) {
    const modal = document.getElementById("contact_modal");
    if (event.key === 'Enter') {
        if (modal.style.display === "block") {
            closeModal();
        } else {
            displayModal();
        }
        event.preventDefault(); // Pour éviter le comportement par défaut du bouton dans le formulaire
    }
}

function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";

    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('id');
    getPhotographerData(photographerId);

    // Ajoute le gestionnaire d'événements pour la touche "Entrée"
    const contactButton = document.querySelector(".contact_button");
    contactButton.addEventListener("keydown", handleEnterKeyPress);

    // Ajoute le gestionnaire d'événements pour fermer la modal en appuyant sur "Entrée"
    const closeButton = document.querySelector(".close-form");
    closeButton.addEventListener("keydown", handleEnterKeyPress);

}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";

    // Retire le gestionnaire d'événements pour la touche "Entrée"
    const closeButton = document.querySelector(".close-form");
    closeButton.removeEventListener("keydown", handleEnterKeyPress);
}

function generateErrorMessage(tag, errorMessage) {
    const parentContainer = tag.parentNode;
    const errorContainer = parentContainer.querySelector(".error-msg");

    if (errorMessage) {
        parentContainer.classList.add("error");
        tag.setAttribute("aria-invalid", "true"); // Indiquer que le champ a une erreur
        if (!errorContainer) {
            const newErrorContainer = document.createElement("div");
            newErrorContainer.classList.add("error-msg");
            newErrorContainer.textContent = errorMessage;
            newErrorContainer.setAttribute("role", "alert"); // Rôle d'alerte pour annoncer dynamiquement
            parentContainer.appendChild(newErrorContainer);
        } else {
            errorContainer.textContent = errorMessage;
        }
    } else {
        parentContainer.classList.remove("error");
        tag.removeAttribute("aria-invalid"); // Enlever l'indication d'erreur
        if (errorContainer) {
            errorContainer.remove();
        }
    }
}

function announceError(errorMessage) {
    const status = document.getElementById("status");
    status.textContent = errorMessage;
}

// Check if inputs are empty and generate an error message if necessary.
function checkEmptyInput(tag){
    // Initialize the Boolean check variable as the result of the function 
    let emptyCheck = false;
    try {
        // Checks if input empty.
        if (tag.value === "") {
            throw new Error(msgError.inputEmpty); // If empty, throw error specific message.
        }
        generateErrorMessage(tag, null);// If field not empty, clear existing error message.
        emptyCheck = true; // Change boolean value if conditions no check
    } catch (error) {
        generateErrorMessage(tag, error.message); // If field empty, generate error message.
        announceError(error.message); // Annoncer l'erreur globale
    }
    return emptyCheck; // returns check varialble(true or false)
}

function checkText(tag){
    // Initialize the Boolean check variable as the result of the function
    let textCheck = false;
    try {
        if (!tag.value.match(regOnlyTxt)) { //checks if input dont matcht with pattern regOnlyTxt (files : config.js)
            throw new Error(msgError.textOnly); // If dont match, throw error specific message.
        }
        generateErrorMessage(tag, null); // If field match, clear existing error message.
        textCheck = true; //Change boolean value if conditions no check
    } catch (error) {
        generateErrorMessage(tag, error.message); // If field dont match pattern, generate error message.
        announceError(error.message); // Annoncer l'erreur globale
    }
    return textCheck; // returns check varialble(true or false)
}

function checkEmail(tag){
    let emailCheck = false; // Initialize the Boolean check variable as the result of the function
    try {
        if (!tag.value.match(regEmail)) { //checks if input dont matcht with pattern regEmail
            throw new Error(msgError.email); // If dont match, throw error specific message.
        }
        generateErrorMessage(tag, null); // If field match, clear existing error message.
        emailCheck = true; //Change boolean value if condition no check
    } catch (error) {
        generateErrorMessage(tag, error.message); // If field dont match pattern, generate error message.
        announceError(error.message); // Annoncer l'erreur globale
    }
    return emailCheck; // returns check varialble(true or false)
}

// Fonction pour annoncer les messages
function announce(message) {
    const status = document.getElementById("status");
    status.textContent = message;
}

// Vérification du formulaire lors de la soumission
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formInputsArray = Array.from(form.elements).filter(input => input.type !== "submit" && input.tagName.toLowerCase() !== "textarea");

    const validationResults = formInputsArray.map((input, index) => {
        let checksResults = {};

        if (input.getAttribute('type') !== "radio" && input.getAttribute('type') !== "checkbox") {
            checksResults.emptyCheck = checkEmptyInput(input);
            console.log(`Empty check for ${input.id}: ${checksResults.emptyCheck}`);
        }

        if (input.getAttribute('type') === "text") {
            checksResults.textCheck = checkText(input);
            console.log(`Text check for ${input.id}: ${checksResults.textCheck}`);
        }

        if (input.getAttribute('type') === "email") {
            checksResults.emailCheck = checkEmail(input);
            console.log(`Email check for ${input.id}: ${checksResults.emailCheck}`);
        }

        return checksResults;
    });

    const errorMessages = validationResults
        .flatMap(resultObj => Object.values(resultObj))
        .filter(check => check !== true)
        .map(error => error.message);  // Utiliser error.message pour obtenir le message d'erreur

    const status = document.getElementById("status");

    if (errorMessages.length === 0) {
        console.log("Good Send");
        console.log(firstName.value);
        console.log(lastName.value);
        console.log(email.value);
        console.log(message.value);
        closeModal();

        // Vider les champs du formulaire
        form.reset();

        // Effacer les messages d'erreur après une soumission réussie
        status.textContent = '';
        status.removeAttribute("role"); // Enlever le rôle d'alerte après la soumission réussie

        // Annoncer le succès
        announce("Formulaire soumis avec succès");
    } else {
        console.log("Form validation failed");

        // Afficher tous les messages d'erreur distincts dans la div "status"
        status.innerHTML = ''; // Supprimer les anciens messages
        errorMessages.forEach(errorMessage => {
            const errorDiv = document.createElement('div');
            errorDiv.textContent = errorMessage;
            errorDiv.setAttribute("role", "alert");
            status.appendChild(errorDiv);
        });
        status.setAttribute("aria-live", "assertive"); // Ajouter le rôle assertive

        // Annoncer les erreurs
        announce("Le formulaire contient des erreurs. Veuillez les corriger.");
    }
});

