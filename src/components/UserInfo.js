export default class UserInfo {
  constructor(selectors) {
    this._nameElement = document.querySelector(selectors.userNameSelector);
    this._descriptionElement = document.querySelector(
      selectors.userDescriptionSelector
    );
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  setUserInfo(userNameSelector, userDescriptionSelector) {
    this._nameElement.textContent = userNameSelector;
    this._descriptionElement.textContent = userDescriptionSelector;
  }
}
