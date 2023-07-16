/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import "./index.css";
import Card from "../components/Card";
import { openPopUp, closePopUp } from "../utils/utils";
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
previewImagePopup.setEventListeners;

/* -------------------------------------------------------------------------- */
/*                               POPUP WITH FORM                              */
/* -------------------------------------------------------------------------- */

/* --------------------------- edit profile modal --------------------------- */
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileEditPopup.setEventListeners;
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
  userInfo.setUserInfo(userNameInput.value, userDescriptionInput.value);
  profileEditPopup.close();
}

/* ----------------------------- add card modal ----------------------------- */
const addCardButton = document.querySelector(".profile__add-button");
const addCardTitleField = document.querySelector(".modal__form-title");
const addCardImageLinkField = document.querySelector(
  ".modal__form-description"
);
const addCardPopup = new PopupWithForm("#card-edit-modal", handleAddCardSubmit);
addCardPopup.setEventListeners();
addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

function handleAddCardSubmit(inputValues) {
  const newCardData = {
    name: addCardTitleField.value,
    link: addCardImageLinkField.value,
  };
  const newCard = createCard(newCardData);
  section.addItem(newCard);
  cardAddFormValidator.resetValidation;
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
