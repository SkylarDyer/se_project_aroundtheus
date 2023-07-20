export default class Card {
  constructor({ name, link }, cardSelector, handleImagePreview) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImagePreview = handleImagePreview;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImagePreview({ name: this._name, link: this._link });
    });
  }

  _handleLikeIcon() {
    this._cardLikeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardLikeButton =
      this._cardElement.querySelector(".card__like-button");
    this._cardDeleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
