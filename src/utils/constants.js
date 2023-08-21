export const selectors = {
  cardSection: ".cards__list",
  cardTemplate: "#card-template",
  previewModal: "#modal-preview",
  cardPopupSelector: "#card-edit-modal",
  profilePopupSelector: "#profile-edit-modal",
  changeAviPopup: "#change-avi-img",
};

export const formValidatorConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__error",
  errorClass: "modal__error_visible",
};

export const cardAddForm = document.querySelector("#add-card-form");
export const profileEditForm = document.querySelector("#edit-profile-form");
export const aviEditForm = document.querySelector("#change-avi-form");
export const cardsList = document.querySelector(".cards__list");
export const userNameInput = document.querySelector("#owner-name");
export const userDescriptionInput =
  document.querySelector("#owner-description");
export const aviButton = aviEditForm.querySelector(".change-avi-form__button");
export const aviEditButton = document.querySelector(
  "#profile-avi__image-hover-button"
);
export const addCardButton = document.querySelector(".profile__add-button");
