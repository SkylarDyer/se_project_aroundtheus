import { openPopUp, closePopUp, closeByEsc } from "../utils/utils.js";
const previewModal = document.querySelector("#modal-preview");
const previewModalImage = previewModal.querySelector(".modal__image-preview");
const previewModalTitle = previewModal.querySelector(".modal__image-title");

export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._cardElement = this._getTemplate();
    this._cardLikeButton =
      this._cardElement.querySelector(".card__like-button");
    this._cardDeleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._setEventListeners();
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImagePreview();
    });
  }

  _handleLikeIcon() {
    this._cardLikeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  _handleImagePreview() {
    previewModalImage.src = this._link;
    previewModalImage.alt = this._name;
    previewModalTitle.textContent = this._name;
    openPopUp(previewModal);
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardImage.classList.add("card__image");
    this._cardElement.querySelector(".card__title").textContent = this._name;

    return this._cardElement;
  }
}
