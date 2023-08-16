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
  addCardButton,
} from "../utils/constants";

import PopupWithImage from "../components/PopupWithImage";

import PopupWithForm from "../components/PopupWithForm";

import PopupWithConfirmation from "../components/PopupWithConfirmation";

import UserInfo from "../components/UserInfo";

import Api from "../components/Api";

/* -------------------------------------------------------------------------- */

/*                                  CARD SECTION                              */

/* -------------------------------------------------------------------------- */

// const section = new Section(
//   {
//     items: initialCards,

//     renderer: (cardData) => {
//       const card = createCard(cardData);

//       section.addItem(card);
//     },
//   },

//   cardsList
// );

let userId;
let section;

// section.renderItems();
const deleteCardPopup = new PopupWithConfirmation(".confirm-popup");
deleteCardPopup.setEventListeners();

function createCard(cardData) {
  const card = new Card(
    cardData,
    selectors.cardTemplate,
    userId,
    (name, link) => {
      imagePopup.open(name, link);
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
  // return card;
  section.addItem(card.getView());
}

/* -------------------------------------------------------------------------- */

/*                                  USER INFO                                 */

/* -------------------------------------------------------------------------- */

const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userDescriptionSelector: ".profile__description",
  userAvi: ".profile__image",
});
const avatarPopup = new PopupWithForm(selectors.changeAviPopup, handleAviPopup);

function handleAviPopup(inputValues) {
  avatarPopup.renderLoading(true);
  api
    .updateProfileAvatar(inputValues.avatar)
    .then((cardData) => {
      userInfo.setAvatar(cardData);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.renderLoading(false, "Save");
    });
}
avatarPopup.close();
avatarPopup.setEventListeners();

// aviEditButton.addEventListener("click", () => {
//   const info = userInfo.getUserInfo();
//   editProfileFormValidator.resetValidation;
//   profileEditPopup.setInputValues(info);
//   profileEditPopup.open();
// });

aviEditButton.addEventListener("click", () => {
  aviFormValidator.resetValidation;
  avatarPopup.open();
});

/* -------------------------------------------------------------------------- */

/*                              POPUP WITH IMAGE                              */

/* -------------------------------------------------------------------------- */
const previewImagePopup = new PopupWithImage("#modal-preview", handleCardClick);
function handleCardClick(cardData) {
  previewImagePopup.open(cardData);
}
previewImagePopup.setEventListeners();

/* -------------------------------------------------------------------------- */

/*                               POPUP WITH FORM                              */

/* -------------------------------------------------------------------------- */

/* --------------------------- edit profile modal --------------------------- */
const profileEditPopup = new PopupWithForm(
  selectors.profilePopupSelector,
  handleProfileEditSubmit
);

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
}
profileEditPopup.close();
profileEditPopup.setEventListeners();

const profileEditButton = document.querySelector(".profile__edit-button");

profileEditButton.addEventListener("click", () => {
  handleProfileEditClick();
  editProfileFormValidator.resetValidation;
});

function handleProfileEditClick() {
  const user = userInfo.getUserInfo();

  userNameInput.value = user.name;

  userDescriptionInput.value = user.about;

  profileEditPopup.open();
}

/* ----------------------------- add card modal ----------------------------- */

// function handleCardAddClick(inputValues) {
//   const { title, link } = inputValues;
//   const newCardData = {
//     name: title,
//     link: link,
//   };
// }

// const { title, link } = inputValues;
// const newCardData = {
//   name: title,
//   link: link,
// };
const addCardPopup = new PopupWithForm(
  selectors.cardPopupSelector,
  handleCardAddClick
);
function handleCardAddClick(inputValues) {
  addCardPopup.renderLoading(true);
  api
    .addNewCard(inputValues)
    .then((cardData) => {
      const addCard = createCard(cardData);
      addCardPopup.close();
      section.addItem(addCard.getView());
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardPopup.renderLoading(false, "Create");
    });
}
addCardPopup.close();
addCardPopup.setEventListeners();

addCardButton.addEventListener("click", () => {
  cardAddFormValidator.resetValidation;
  cardAddFormValidator.toggleButtonState();
  addCardPopup.open();
});
// const newCard = createCard(cardData);
// section.addItem(newCard);
// addCardPopup.close();
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

const aviFormValidator = new FormValidator(formValidatorConfig, aviEditForm);
aviFormValidator.enableValidation();

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

api
  .getAPIInfo()
  .then(([user, initialCards]) => {
    userId = user._id;
    userInfo.setUserInfo({ name: user.name, description: user.about });
    userInfo.setAvatar(user.avatar);
    section = new Section(
      {
        items: initialCards,
        renderer: createCard,
      },

      selectors.cardSection
    );
    section.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });
