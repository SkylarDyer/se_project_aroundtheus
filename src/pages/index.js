import "./index.css";

// import classes
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
} from "../utils/constants";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";

// functions
function addCard(data) {
  const cardData = {
    name: data[".modal__form-title"],
    link: data[".modal__form-description"],
  };
  renderCard(cardData);
  newCardPopup.close();
}

// const formPreviewPopup = new PopupWithForm(popupSelector, handleFormSubmit);
const newCardPopup = new PopupWithForm("#card-edit-modal", () => {});
newCardPopup.open();

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

//

const cardAddFormValidator = new FormValidator(
  formValidatorConfig,
  cardAddForm
);

const editProfileFormValidator = new FormValidator(
  formValidatorConfig,
  profileEditForm
);

// initialize instances
section.renderItems(initialCards);
cardAddFormValidator.enableValidation();
editProfileFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                      Project 8 GENERATE INITIAL CARDS                      */
/* -------------------------------------------------------------------------- */

// Preview image Card
const previewImagePopup = new PopupWithImage("#preview-image-modal");

// Generate Card
const cardList = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".card__list"
);

cardList.renderItems();
