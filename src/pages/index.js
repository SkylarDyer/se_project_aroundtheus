/* -------------------------------------------------------------------------- */

/*                                   IMPORTS                                  */

/* -------------------------------------------------------------------------- */

import "./index.css";

import Card from "../components/Card";

import FormValidator from "../components/FormValidator";

import Section from "../components/Section";

import {
  initialCards,
  selectors,
  formValidatorConfig,
  cardAddForm,
  profileEditForm,
  cardsList,
  userDescriptionInput,
  userNameInput,
} from "../utils/constants";

import PopupWithImage from "../components/PopupWithImage";

import PopupWithForm from "../components/PopupWithForm";

import UserInfo from "../components/UserInfo";

import Api from "../components/Api";

/* -------------------------------------------------------------------------- */

/*                                  CARD SECTION                              */

/* -------------------------------------------------------------------------- */

const section = new Section(
  {
    items: initialCards,

    renderer: (cardData) => {
      const card = createCard(cardData);

      section.addItem(card);
    },
  },

  cardsList
);

section.renderItems();

function createCard(cardData) {
  const card = new Card(cardData, selectors.cardTemplate, handleCardClick);

  return card.getView();
}

function handleCardClick(cardData) {
  previewImagePopup.open(cardData);
}

/* -------------------------------------------------------------------------- */

/*                                  USER INFO                                 */

/* -------------------------------------------------------------------------- */

const userInfo = new UserInfo({
  userNameSelector: ".profile__title",

  userDescriptionSelector: ".profile__description",
});

/* -------------------------------------------------------------------------- */

/*                              POPUP WITH IMAGE                              */

/* -------------------------------------------------------------------------- */
const previewImagePopup = new PopupWithImage("#modal-preview");
previewImagePopup.setEventListeners();

/* -------------------------------------------------------------------------- */

/*                               POPUP WITH FORM                              */

/* -------------------------------------------------------------------------- */

/* --------------------------- edit profile modal --------------------------- */

const profileEditButton = document.querySelector(".profile__edit-button");

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",

  handleProfileEditSubmit
);

profileEditPopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  handleProfileEditClick();
});

function handleProfileEditClick() {
  const user = userInfo.getUserInfo();

  userNameInput.value = user.name;

  userDescriptionInput.value = user.description;

  profileEditPopup.open();
}

function handleProfileEditSubmit(inputValues) {
  userInfo.setUserInfo(inputValues);
  profileEditPopup.close();
}

/* ----------------------------- add card modal ----------------------------- */

const addCardButton = document.querySelector(".profile__add-button");

const addCardPopup = new PopupWithForm("#card-edit-modal", handleAddCardSubmit);

addCardPopup.setEventListeners();

addCardButton.addEventListener("click", () => {
  cardAddFormValidator.resetValidation;
  cardAddFormValidator.toggleButtonState();
  addCardPopup.open();
});

function handleAddCardSubmit(inputValues) {
  const { title, link } = inputValues;
  const newCardData = {
    name: title,
    link: link,
  };
  const newCard = createCard(newCardData);
  section.addItem(newCard);
  addCardPopup.close();
}

/* -------------------------------------------------------------------------- */

/*                               FORM VALIDATION                              */

/* -------------------------------------------------------------------------- */

const cardAddFormValidator = new FormValidator(
  formValidatorConfig,

  cardAddForm
);

cardAddFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(
  formValidatorConfig,

  profileEditForm
);

editProfileFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                                     API                                    */
/* -------------------------------------------------------------------------- */

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((result) => {
    // process the result
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });
