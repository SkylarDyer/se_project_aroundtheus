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
const previewImgModal = document.querySelector("#modal-preview-image");
const previewImgBtn = previewImgModal.querySelector(".modal__close");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function closePopUp(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEsc);
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
}

function openPopUp(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", (evt) => closeByEsc(evt, modal));
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closePopUp(openedPopup);
  }
}

cardAddButton.addEventListener("click", () => openPopUp(cardEditModal));

profileCloseBtn.addEventListener("click", () => closePopUp(profileEditModal));

cardAddCloseBtn.addEventListener("click", () => closePopUp(cardEditModal));

previewImgBtn.addEventListener("click", () => closePopUp(previewImgModal));

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardTitleEl.textContent = cardData.name;
  cardImageEl.alt = cardData.link;
  cardImageEl.src = cardData.link;

  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button_active");
  });

  const cardDelBtn = cardElement.querySelector(".card__delete-button");
  cardDelBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  const previewImgModal = document.querySelector(".modal__image-preview");

  const previewImgTitle = document.querySelector(".modal__image-title");

  cardImageEl.addEventListener("click", () => {
    previewImgModal.setAttribute("src", cardImageEl.getAttribute("src"));
    previewImgModal.alt = cardData.name;
    previewImgTitle.textContent = cardData.name;
    openPopUp(document.querySelector("#modal-preview-image"));
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  return cardElement;
}

function renderInitialCards(initialCards) {
  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardListEl.append(cardElement);
  });
}
renderInitialCards(initialCards);

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function openEditProfileModal() {
  fillProfileForm();
  openPopUp(profileEditModal);
}

function handleMouseDown(e, modal) {
  handleClickOutsideCard(e, modal);
}

function closeModalOnRemoteClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close")
  ) {
    closePopUp(evt.target);
  }
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditModal);
}

function handleCardAddFormSubmit(e) {
  e.preventDefault();
  const cardFormInputs = [e.target.title, e.target.link];
  const cardFormSubmitButton = e.target.querySelector(
    config.submitButtonSelector
  );
  const cardElement = getCardElement({
    name: cardFormInputs.value,
    link: cardFormInputs.value,
  });
  cardListEl.prepend(cardElement);
  closePopUp(cardEditModal);
  cardAddForm.reset();
  toggleButtonState(cardFormInputs, cardFormSubmitButton, config);
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditBtn.addEventListener("click", openEditProfileModal);

cardAddForm.addEventListener("submit", handleCardAddFormSubmit);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
