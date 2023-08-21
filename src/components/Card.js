export default class Card {
  constructor(
    name,
    link,
    isLiked,
    likes,
    cardId,
    userId,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    cardSelector
  ) {
    this._name = name;
    this._link = link;
    this.isLiked = isLiked;
    this.cardId = cardId;
    this._likes = likes;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () =>
      this._handleLikeClick(this)
    );
    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._getData());
    });
  }

  handleDeleteCard() {
    this._cardElement.remove();
  }

  _renderLikes() {
    if (this.isLiked) {
      this._cardLikeButton.classList.add("card__like-button_active");
    } else {
      this._cardLikeButton.classList.remove("card__like-button_active");
    }
  }

  updateLikes(isLiked) {
    this.isLiked = isLiked;
    this._renderLikes();
  }

  _showCardLikes() {
    this._cardLikeCounter.textContent = this._likes.length;
    if (this.cardIsLiked()) {
      this._cardLikeButton.classList.add("card__like-button_active");
    } else {
      this._cardLikeButton.classList.remove("card__like-button_active");
    }
  }

  _getData() {
    return {
      name: this._name,
      link: this._link,
    };
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
    this._cardLikeCounter = this._cardElement.querySelector(".card__counter");
    this._cardLikeCounter.textContent = this._cardLikesCount;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._setEventListeners();
    this._renderLikes();

    return this._cardElement;
  }
}
