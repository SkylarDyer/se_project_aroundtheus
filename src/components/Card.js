export default class Card {
  constructor(
    {
      data,
      name,
      link,
      likes,
      userId,
      handleCardClick,
      handleLikeClick,
      handleDeleteClick,
    },
    cardSelector
  ) {
    this._name = name;
    this._link = link;
    this._userId = userId;
    this._likes = likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _setEventListeners() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => this._handleLikeClick(this));

    const deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });

    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      this._handleCardClick(this._getData());
    });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  _renderLikes() {
    this._likes.forEach((like) => {
      if (like._id === this._userId) {
        this._cardLikeButton.classList.add("card__like-button_active");
      }
    });
  }
  // cardIsLiked() {
  //   return this._likes.some((likes) => {
  //     return likes._id === this._userId;
  //   });
  // }

  _getData() {
    return {
      name: this._name,
      link: this._link,
    };
  }

  // getId() {
  //   return this._id;
  // }

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
    // this._cardLikes = this._cardElement.querySelector(".card__counter");
    this.renderLikes();

    this._setEventListeners();

    return this._cardElement;
  }
}
