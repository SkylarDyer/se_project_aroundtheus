export default class UserInfo {
  constructor(selectors) {
    this.nameElement = document.querySelector(selectors.userNameSelector);
    this.descriptionElement = document.querySelector(
      selectors.userDescriptionSelector
    );
  }

  getUserInfo() {
    return {
      name: this.nameElement.value,
      description: this.descriptionElement.value,
    };
  }

  setUserInfo(user) {
    this.nameElement.textContent = user.title;
    this.descriptionElement.textContent = user.description;
    Ï;
  }
}
