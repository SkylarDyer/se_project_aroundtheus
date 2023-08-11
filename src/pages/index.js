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
  aviEditForm,
  cardsList,
  userDescriptionInput,
  userNameInput,
  aviButton,
  aviEditButton,
} from "../utils/constants";

import PopupWithImage from "../components/PopupWithImage";

import PopupWithForm from "../components/PopupWithForm";

import PopupWithConfirmation from "../components/PopupWithConfirmation";

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
const deleteCardPopup = new PopupWithConfirmation(".confirm-popup");
deleteCardPopup.setEventListeners();

// function handleCardClick(cardData) {
//   previewImagePopup.open(cardData);
// }

function createCard(cardData) {
  const card = new Card(
    cardData,
    selectors.cardTemplate,
    (cardName, cardLink) => {
      imagePopup.open(cardName, cardLink);
    },

    (cardId) => {
      deleteCardPopup.open();
      deleteCardPopup.setSubmitAction(() => {
        deleteCardPopup.renderLoading(true);
        api
          .deleteUserCard(cardId)
          .then(() => {
            card.deleteCard();
            deleteCardPopup.close();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            deleteCardPopup.renderLoading(false);
          });
      });
    },

    (cardId) => {
      if (card.isLiked()) {
        api
          .removeCardLikes(cardId)
          .then((res) => {
            card.updateLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .addCardLikes(cardId)
          .then((res) => {
            card.updateLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  );
  return card;
}

/* -------------------------------------------------------------------------- */

/*                                  USER INFO                                 */

/* -------------------------------------------------------------------------- */

const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userDescriptionSelector: ".profile__description",
  userAvi: ".profile__image",
});

const avatarPopup = new PopupWithForm({
  popupSelector: selectors.changeAviPopup,
  handleFormSubmit: (inputValues) => {
    console.log(inputValues);
    avatarPopup.renderLoading(true);
    api
      .updateProfileAvatar(values.avatar)
      .then((data) => {
        userInfo.setAvatar(data.avatar);
        avatarPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        avatarPopup.renderLoading(false, "save");
      });
  },
});

avatarPopup.setEventListeners();

aviEditButton.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  editProfileFormValidator.resetValidation();
  profileEditPopup.setInputValues(info);
  profileEditPopup.open();
});

aviButton.addEventListener("click", function () {
  aviFormValidator.resetValidation();
  avatarPopup.open();
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
const profileEditPopup = new PopupWithForm({
  popupSelector: selectors.profilePopupSelector,
  handleFormSubmit: (inputValues) => {
    profileEditPopup.renderLoading(true);
    api
      .updateProfileInfo(inputValues)
      .then((data) => {
        console.log(data);
        userInfo.setUserInfo(data);
        profileEditPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profileEditPopup.renderLoading(false, "Save");
      });
  },
});

profileEditPopup.setEventListeners();

const profileEditButton = document.querySelector(".profile__edit-button");

profileEditButton.addEventListener("click", () => {
  handleProfileEditClick();
  cardAddFormValidator.resetValidation();
});

function handleProfileEditClick() {
  const user = userInfo.getUserInfo();

  userNameInput.value = user.name;

  userDescriptionInput.value = user.description;

  profileEditPopup.open();
}

// function handleProfileEditSubmit(inputValues) {
//   userInfo.setUserInfo(inputValues);
//   profileEditPopup.close();
// }

/* ----------------------------- add card modal ----------------------------- */

const addCardButton = document.querySelector(".profile__add-button");

function handleCardAddClick(inputValues) {
  const { title, link } = inputValues;
  const newCardData = {
    name: title,
    link: link,
  };
}
const addCardPopup = new PopupWithForm({
  popupSelector: selectors.cardPopupSelector,
  handleFormSubmit: (inputValues) => {
    addCardPopup.renderLoading(true);
    api
      .addNewCard(inputValues)
      .then((cardData) => {
        const addCard = createCard(cardData);
        addCardPopup.close();
        cardSection.addItem(addCard.getView());
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        addCardPopup.renderLoading(false, "Create");
      });
  },
});

addCardPopup.setEventListeners();

addCardButton.addEventListener("click", () => {
  cardAddFormValidator.resetValidation();
  cardAddFormValidator.toggleButtonState();
  addCardPopup.open();
});

const newCard = createCard(newCardData);
section.addItem(newCard);
addCardPopup.close();

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

const aviFormValidator = new formValidator(formValidatorConfig, aviEditForm);
aviFormValidator.enableValidation();

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
  .getAPIInfo()
  .then(([userData, userCards]) => {
    console.log(userData);
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData.avatar);
    cardSection = new Section(
      {
        items: userCards,
        renderer: (cardData) => {
          const newCard = createCard(cardData);
          cardSection.addItem(newCard.getView());
        },
      },
      selectors.cardSection
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });
