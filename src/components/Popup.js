export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._popupElementCloseButton =
      this._popupElement.querySelector(".modal__close");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("keydown", this._handleEscClose);
    this._popupElement.addEventListener("mousedown", this._handleClickOutside);

    this._popupElementCloseButton.addEventListener("click", () => {
      this.close();
    });
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleClickOutside(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }
}