import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import ConfirmPopup from "../scripts/components/ConfirmPopup.js";
import UserInfo from "../scripts/components/UserInfo.js";
import {
  configurationObject,
  cardTemplateSelector,
  editButton,
  addButton,
  avatarChangeButton,
  profileNameSelector,
  profileOccupationSelector,
  profileAvatarSelector,
  profileNameInputElement,
  profileOccupationInputElement,
  logoElement,
  avatarEditImageElement
} from "../scripts/utils/constants.js";
import { api } from "../scripts/components/Api.js";
import "./index.css";

import logoSrc from "../images/logo.svg";
logoElement.src = logoSrc;
import editSrc from "../images/edit.svg";
avatarEditImageElement.src = editSrc;

//popup instances creation
const editProfilePopup = new PopupWithForm(".edit-popup", handleProfileEditForm);
const addCardPopup = new PopupWithForm(".add-popup", handleCardAddForm);
const avatarChangePopup = new PopupWithForm(".avatar-change-popup", handleAvatarChangeForm);
const confirmPopup = new ConfirmPopup(".confirm-popup");
const imagePopup = new PopupWithImage(".picture-popup");

//forms validation
const formValidators = {};

const enableValidation = (configurationObject) => {
  const formList = Array.from(document.forms);
  formList.forEach(formElement => {
    const validator = new FormValidator(configurationObject, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(configurationObject);


const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  occupationSelector: profileOccupationSelector,
  avatarSelector: profileAvatarSelector
});

//user id will be set after initial server request
let userId = "";

//Editing user info on server and immediatelly updating it on page
function editUserInfo(data) {
  editProfilePopup.renderWaiting(true);
  api
    .editProfile(data)
    .then((res) => {
      userInfo.setUserInfo({name: res.name, about: res.about});
      editProfilePopup.close();
    })
    .catch(console.log)
    .finally(() => {editProfilePopup.renderWaiting(false);}
    );
}

const createNewCard = (data) => {
  const cardElement = new Card(
    data,
    userId,
    cardTemplateSelector,
    (evt) => {
      imagePopup.open(data);
    },
    function () {
      //like button handler
      if (!cardElement.isLikedByOwner()) {
        api.addLike(cardElement.getId()).then((res) => {
          cardElement.setLikes(res.likes);
        })
        .catch(console.log);
      } else {
        api.removeLike(cardElement.getId()).then((res) => {
          cardElement.setLikes(res.likes);
        })
        .catch(console.log);
      }
    },
    function () {
      //delete button handler
      confirmPopup.open();
      confirmPopup.setCardDeleteFunction((card) => {
        api
          .deleteCard(card.getId())
          .then((res) => {
            card.removeCardFromDom();
            confirmPopup.close();
          })
          .catch(console.log);
        }
      );
      confirmPopup.setCardToDelete(cardElement);
    }
  );
  return cardElement.getCard();
};

const cardsList = new Section((item) => {
  const card = createNewCard(item);
  cardsList.addItem(card);
}, ".gallery");

//Initial card and user info combined fetching
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData, initialCards]) => {
  userInfo.setUserInfo({name: userData.name, about: userData.about, avatar: userData.avatar});
  userId = userData._id;
  cardsList.renderItems(initialCards);
})
.catch(console.log);

function handleProfileEditButton() {
  editProfilePopup.open();
  const { name, occupation } = userInfo.getUserInfo();
  profileNameInputElement.value = name;
  profileOccupationInputElement.value = occupation;
  formValidators["edit-form"].toggleButtonState();
}

function handleProfileEditForm(evt) {
  evt.preventDefault();
  const newUserData = editProfilePopup.getInputValues();
  editUserInfo(newUserData);
}

function handleCardAddButton() {
  formValidators["add-form"].toggleButtonState();
  addCardPopup.open();
}
function handleCardAddForm(evt) {
  const {name, link} = addCardPopup.getInputValues();
  addCardPopup.renderWaiting(true);
  api
    .addNewCard({name, link})
    .then((res) => {
      cardsList.addItem(createNewCard(res));
      addCardPopup.close();
    })
    .catch(console.log)
    .finally(() => {addCardPopup.renderWaiting(false);});
}

function handleAvatarChangeButton(){
  formValidators["avatar-change-form"].toggleButtonState();
  avatarChangePopup.open();
}

function handleAvatarChangeForm(evt){
  evt.preventDefault();
  const link = avatarChangePopup.getInputValues().link;
  avatarChangePopup.renderWaiting(true);
  api.setAvatar(link)
  .then(res => {
    userInfo.setUserInfo({avatar: res.avatar});
    avatarChangePopup.close();
  })
  .catch(console.log)
  .finally(() => {avatarChangePopup.renderWaiting(false);});
}

editButton.addEventListener("click", handleProfileEditButton);
addButton.addEventListener("click", handleCardAddButton);
avatarChangeButton.addEventListener("click", handleAvatarChangeButton);
