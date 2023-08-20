export default class UserInfo {
  constructor(selectors) {
    this._nameElement = document.querySelector(selectors.userNameSelector);
    this._descriptionElement = document.querySelector(
      selectors.userDescriptionSelector
    );
    this._userAvi = document.querySelector(selectors.userAvi);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._descriptionElement.textContent,
    };
  }

  setUserInfo(inputValues) {
    this._nameElement.textContent = inputValues.name;
    this._descriptionElement.textContent = inputValues.about;
  }

  setAvatar(avatar) {
    // this._userAvi.textContent = inputValues.name;
    this._userAvi.src = avatar;
  }

  // getAvatar() {
  //   return this._userAvi.src;
  // }
}
