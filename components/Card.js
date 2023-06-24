import { openPopUp, closePopUp } from "../utils/utils.js";
import {
  previewModal,
  previewImgTitle,
  previewImgModal,
} from "../pages/index.js";

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._cardElement = this._getTemplate();
    this._cardLikeButton =
      this._cardElement.querySelector(".card__like-button");
    this._cardDeleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage = this._cardElement.querySelector(".card__image");
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
    this._cardElement = null;
  }

  _handleImagePreview() {
    previewImgModal.src = this._link;
    previewImgModal.alt = this._link;
    previewImgTitle.textContent = this._name;
    openPopUp(previewModal);
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  // getCardElement() {
  //   this._cardElement = this._getTemplate();
  //   this._setEventListeners();
  //   this._cardElement.querySelector(".card__title").textContent = this._name;
  //   this._cardElement.querySelector(".card__image").src = this._link;
  //   this._cardElement.querySelector(".card__image").alt = this._name;

  // }

  getView() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardImage.classList.add("card__image");
    this._cardElement.querySelector(".card__title").textContent = this._name;

    return this._cardElement;
  }
}
