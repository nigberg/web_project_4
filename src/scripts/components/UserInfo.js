export default class UserInfo{
  constructor({name, occupation}){
    this._name = name;
    this._occupation = occupation;
  }
  getUserInfo(){
    const result = {};
    result.name = this._name;
    result.occupation = this._occupation;
    return result;
  }
  setUserInfo({name, occupation}){
    this._name = name;
    this._occupation = occupation;
  }
}