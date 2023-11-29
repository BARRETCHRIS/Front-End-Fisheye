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

// Fonction pour générer et afficher des messages d'erreur
function generateErrorMessage(tag, errorMessage) {
    const parentContainer = tag.parentNode;
    const errorContainer = parentContainer.querySelector(".error-msg");

    if (errorMessage) {
        parentContainer.classList.add("error");
        if (!errorContainer) {
            const newErrorContainer = document.createElement("div");
            newErrorContainer.classList.add("error-msg");
            newErrorContainer.textContent = errorMessage;
            parentContainer.appendChild(newErrorContainer);
        } else {
            errorContainer.textContent = errorMessage;
        }
    } else {
        parentContainer.classList.remove("error");
        if (errorContainer) {
            errorContainer.remove();
        }
    }
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
    }
    return textCheck; // returns check varialble(true or false)
}

function checkEmail(tag){
    let emailCheck = false; // Initialize the Boolean check variable as the result of the function
    try {
        if (!tag.value.match(regEmail)) { //checks if input dont matcht with pattern regEmail (files : config.js)
            throw new Error(msgError.email); // If dont match, throw error specific message.
        }
        generateErrorMessage(tag, null); // If field match, clear existing error message.
        emailCheck = true; //Change boolean value if condition no check
    } catch (error) {
        generateErrorMessage(tag, error.message); // If field dont match pattern, generate error message.
    }
    return emailCheck; // returns check varialble(true or false)
}

// Vérification du formulaire lors de la soumission
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formInputsArray = Array.from(form.elements).filter(input => input.type !== "submit");

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

    const allChecksTrue = validationResults.every(resultObj => {
        return Object.values(resultObj).every(check => check === true);
    });

    if (allChecksTrue) {
        console.log("Good Send");
        closeModal();
    } else {
        console.log("Form validation failed");
    }
});