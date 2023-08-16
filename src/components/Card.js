export default class Card {
  constructor(data, cardSelector, handleImagePreview, userId) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._handleImagePreview = handleImagePreview;
    this._userId = userId;
    // this._userCardOwnerId = data["owner"]._id;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeIcon(this._id);
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this._id);
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

  renderLikes() {
    this._cardLikes.textContent = this._likes;
    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  // isLiked() {
  //   return this._likes.some((like) => like._id === this._userId);
  // }

  updateLikes(likes) {
    this._likes = likes;
    this.renderLikes();
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
    this._cardLikes = this._cardElement.querySelector(".card__counter");
    // this.renderLikes();
    // if (this._userId != this._userCardOwnerId) {
    //   this._deleteButton.remove();
    // }

    // this._setEventListeners();

    return this._cardElement;
  }
}
