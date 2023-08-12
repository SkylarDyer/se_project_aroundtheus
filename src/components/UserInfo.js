export default class UserInfo {
  constructor(selectors, userAvi) {
    this._nameElement = document.querySelector(selectors.userNameSelector);
    this._descriptionElement = document.querySelector(
      selectors.userDescriptionSelector
    );
    this._userAvi = document.querySelector(userAvi);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  setUserInfo(inputValues) {
    this._nameElement.textContent = inputValues.title;
    this._descriptionElement.textContent = inputValues.description;
  }

  // setAvatar(value) {
  //   this._userAvi.textContent = value.name;
  //   this._userAvi.src = value;
  // }

  getAvatar() {
    return this._userAvi.src;
  }
}
