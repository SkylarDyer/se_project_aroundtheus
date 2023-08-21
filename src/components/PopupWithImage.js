import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImgTitle = this._popupElement.querySelector(
      ".modal__image-title"
    );
    this._previewImgModal = this._popupElement.querySelector(
      ".modal__image-preview"
    );
  }

  open(data) {
    super.open();
    this._previewImgModal.src = data.link;
    this._previewImgModal.alt = data.name;
    this._previewImgTitle.textContent = data.name;
  }
}
