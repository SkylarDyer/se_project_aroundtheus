import "./index.css"
import Card from "../components/Card";
import { openPopUp, closePopUp } from "../utils/utils";
import FormValidator from "../components/FormValidator";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
export const previewModal = document.querySelector("#modal-preview");
export const previewImgTitle = previewModal.querySelector(
  ".modal__image-title"
);
export const previewImgModal = previewModal.querySelector(
  ".modal__image-preview"
);
const previewImgBtn = previewModal.querySelector(".modal__close");
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseBtn = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector(".modal__form-title");
const profileDescriptionInput = document.querySelector(
  ".modal__form-description"
);
const profileEditForm = document.querySelector("#edit-profile-form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardEditModal = document.querySelector("#card-edit-modal");
const cardAddButton = document.querySelector(".profile__add-button");
const cardAddCloseBtn = cardEditModal.querySelector(".modal__close");
const cardAddForm = document.querySelector("#add-card-form");
const cardTitleInput = document.querySelector("#card-title");
const cardUrlInput = document.querySelector("#card-link");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

cardAddButton.addEventListener("click", () => openPopUp(cardEditModal));

profileCloseBtn.addEventListener("click", () => closePopUp(profileEditModal));

cardAddCloseBtn.addEventListener("click", () => closePopUp(cardEditModal));

previewImgBtn.addEventListener("click", () => closePopUp(previewModal));

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};
function renderCard(cardData) {
  const card = new Card(cardData, "#card-template");
  const cardElement = card.getView();
  cardListEl.prepend(cardElement);
}

function getCardElement(data) {
  const card = new Card(data, "#card-template");
  const cardElement = card.getView();
  return cardElement;
}

function renderInitialCards(initialCards) {
  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardListEl.append(cardElement);
  });
}
renderInitialCards(initialCards);

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditModal);
  profileEditForm.reset();
}

function handleCardAddFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);

  closePopUp(cardEditModal);
  cardAddForm.reset();
  addFormValidator.toggleButtonState();
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopUp(profileEditModal);
});

cardAddForm.addEventListener("submit", handleCardAddFormSubmit);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

/* -------------------------------------------------------------------------- */
/*                                   Add Card                                */
/* -------------------------------------------------------------------------- */

cardAddButton.addEventListener("click", () => {
  openPopUp(cardEditModal);
});

/* -------------------------------------------------------------------------- */
/*                                   Validator                                */
/* -------------------------------------------------------------------------- */
const formValidatorConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input-type-error",
  errorClass: "modal__error_visible",
};

const addFormValidator = new FormValidator(formValidatorConfig, cardAddForm);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(
  formValidatorConfig,
  profileEditForm
);
editFormValidator.enableValidation();
