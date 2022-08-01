export default class UserInfo {
  constructor({ nameSelector, occupationSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._occupationElement = document.querySelector(occupationSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    const result = {};
    result.name = this._nameElement.textContent;
    result.occupation = this._occupationElement.textContent;
    result.avatar = this._avatarElement.style.backgroundImage;
    return result;
  }
  setUserInfo(name, about, avatar = this._avatarElement.style.backgroundImage) {
    this._nameElement.textContent = name;
    this._occupationElement.textContent = about;
    this._avatarElement.style.backgroundImage = `url(${avatar})`;
  }
  setAvatar(avatar){
    this._avatarElement.style.backgroundImage = `url(${avatar})`;
  }
}
