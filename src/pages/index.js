/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */

import "./index.css";
import PopupWithConfirmation from "../components/PopupWithConfirmation";

import PopupWithImage from "../components/PopupWithImage";

import PopupWithForm from "../components/PopupWithForm";
import FormValidator from "../components/FormValidator";

import UserInfo from "../components/UserInfo";
import Section from "../components/Section";
import Card from "../components/Card";

import Api from "../components/Api";
import {
  selectors,
  formValidatorConfig,
  cardAddForm,
  profileEditForm,
  aviEditForm,
  userDescriptionInput,
  userNameInput,
  aviEditButton,
  addCardButton,
} from "../utils/constants";

/* -------------------------------------------------------------------------- */
/*                                   CONSTS                                   */
/* -------------------------------------------------------------------------- */
const avatarPopup = new PopupWithForm(selectors.changeAviPopup, handleAviPopup);
const profileEditButton = document.querySelector(".profile__edit-button");
const deleteCardPopup = new PopupWithConfirmation("#modal__delete");
const previewImagePopup = new PopupWithImage(
  selectors.previewModal,
  handleCardClick
);
const profileEditPopup = new PopupWithForm(
  selectors.profilePopupSelector,
  handleProfileEditSubmit
);
const addCardPopup = new PopupWithForm(
  selectors.cardPopupSelector,
  handleCardAddClick
);
const cardSelector = selectors.cardTemplate;
const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userDescriptionSelector: ".profile__description",
  userAvi: ".profile__image",
});

/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS & HANDLERS                      */
/* -------------------------------------------------------------------------- */
let newCardSection;
let userId;

function createCard(cardData) {
  const card = new Card(
    cardData.name,
    cardData.link,
    cardData.isLiked,
    cardData.likes,
    cardData._id,
    userId,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    cardSelector
  );

  return card.getView();
}
function handleProfileEditSubmit(inputValues) {
  profileEditPopup.renderLoading(true);
  api
    .updateProfileInfo(inputValues)
    .then(() => {
      userInfo.setUserInfo(inputValues);
      profileEditPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileEditPopup.renderLoading(false, "Save");
    });
  console.log(inputValues);
}
function handleCardAddClick(inputValues) {
  addCardPopup.renderLoading(true);
  api
    .addNewCard(inputValues)
    .then((cardData) => {
      const addCard = createCard(cardData);
      newCardSection.addItem(addCard);
      addCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardPopup.renderLoading(false, "Create");
    });
}
function handleAviPopup(inputValues) {
  avatarPopup.renderLoading(true);
  api
    .updateProfileAvatar(inputValues.avatar)
    .then(() => {
      userInfo.setAvatar(inputValues.avatar);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
}
function handleDeleteClick(card) {
  deleteCardPopup.open();
  deleteCardPopup.setSubmitAction(() => {
    deleteCardPopup.renderLoading(true);
    api
      .deleteCard(card.cardId)
      .then(() => {
        card.handleDeleteCard();
        deleteCardPopup.close();
      })

      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        deleteCardPopup.renderLoading(false);
      });
  });
}

function handleProfileEditClick() {
  const user = userInfo.getUserInfo();
  userNameInput.value = user.name;
  userDescriptionInput.value = user.about;
  profileEditPopup.open();
}

function handleLikeClick(card) {
  if (card.isLiked) {
    api
      .removeCardLikes(card.cardId)
      .then((res) => {
        card.updateLikes(res.isLiked);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .addCardLikes(card.cardId)
      .then((res) => {
        card.updateLikes(res.isLiked);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function handleCardClick(cardData) {
  previewImagePopup.open(cardData);
}

/* -------------------------------------------------------------------------- */
/*                               FORM VALIDATION                              */
/* -------------------------------------------------------------------------- */
const aviFormValidator = new FormValidator(formValidatorConfig, aviEditForm);
const editProfileFormValidator = new FormValidator(
  formValidatorConfig,
  profileEditForm
);
const cardAddFormValidator = new FormValidator(
  formValidatorConfig,
  cardAddForm
);
editProfileFormValidator.enableValidation();
cardAddFormValidator.enableValidation();
aviFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                               EVENT LISTENERS                              */
/* -------------------------------------------------------------------------- */
aviEditButton.addEventListener("click", () => {
  aviFormValidator.resetValidation;
  avatarPopup.open();
});
profileEditButton.addEventListener("click", () => {
  handleProfileEditClick();
  editProfileFormValidator.resetValidation;
});
addCardButton.addEventListener("click", () => {
  cardAddFormValidator.resetValidation;
  cardAddFormValidator.toggleButtonState();
  addCardPopup.open();
});
previewImagePopup.setEventListeners();
profileEditPopup.setEventListeners();
deleteCardPopup.setEventListeners();
addCardPopup.setEventListeners();
avatarPopup.setEventListeners();
/* -------------------------------------------------------------------------- */
/*                                     API                                    */
/* -------------------------------------------------------------------------- */
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "8d1c8a4d-d591-4303-89c5-4b1506b830b3",
    "Content-Type": "application/json",
  },
});
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData.avatar);
    userId = userData._id;
    newCardSection = new Section(
      {
        items: cardData,
        renderer: (data) => {
          const newCard = createCard(data);
          newCardSection.addItem(newCard);
        },
      },
      selectors.cardSection
    );
    newCardSection.renderItems();
  })
  .catch(console.error);
