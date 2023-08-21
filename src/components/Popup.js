export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", this._handleClickOutside);
    this.close();
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleClickOutside = (evt) => {
    if (
      evt.target.classList.contains("modal_opened") ||
      evt.target.classList.contains("modal__close")
    ) {
      this.close();
    }
  };
}
