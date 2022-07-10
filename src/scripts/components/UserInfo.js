export default class UserInfo {
  constructor({ nameSelector, occupationSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._occupationElement = document.querySelector(occupationSelector);
  }
  getUserInfo() {
    const result = {};
    result.name = this._nameElement.textContent;
    result.occupation = this._occupationElement.textContent;
    return result;
  }
  setUserInfo({ name, occupation }) {
    this._nameElement.textContent = name;
    this._occupationElement.textContent = occupation;
  }
}
