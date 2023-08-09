// import { values } from "core-js/core/array";

export default class UserInfo {
  constructor(selectors, userAvatar) {
    this._nameElement = document.querySelector(selectors.userNameSelector);
    this._descriptionElement = document.querySelector(
      selectors.userDescriptionSelector
    );
    this._userAvatar = document.querySelector(userAvatar);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  setUserInfo(user) {
    this._nameElement.textContent = user.title;
    this._descriptionElement.textContent = user.description;
  }

  setAvatar(Value) {
    this._userAvatar.textContent = value.name;
    this._userAvatar.src = value;
  }

  getAvatar() {
    return this.userAvatar.src;
  }
}
