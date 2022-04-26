// Elements selecting
const editPopupCloseButton = document.querySelector(".edit-popup__close-button");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editForm = document.querySelector(".edit-popup__edit-form");
const addForm = document.querySelector(".add-popup__form");
const editPopup = document.querySelector(".edit-popup");
const picturePopup = document.querySelector(".picture-popup");
const addPopup = document.querySelector(".add-popup");
const gallery = document.querySelector(".gallery");
const cardTemplate = document.querySelector("#card").content;

// Gallery building start
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

initialCards.forEach(item=>{
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__description").textContent = item.name;
  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__image").alt = item.name;
  gallery.append(cardElement);
});
const likeButtons = document.querySelectorAll(".card__like-button");
const deleteButtons = document.querySelectorAll(".card__delete-button");
const cardImages = document.querySelectorAll(".card__image");
// Gallery building end


// Event handlers
function handleCloseButton(evt){
  evt.target.parentElement.parentElement.classList.remove("popup_visible");
}
function handleEditButton(){
  editPopup.classList.add("popup_visible");
  let userName = document.querySelector(".profile__name").textContent;
  let userAbout = document.querySelector(".profile__occupation").textContent;
  let inputName = document.querySelector("#edit-popup__input-name");
  let inputAbout = document.querySelector("#edit-popup__input-about");
  inputName.value = userName;
  inputAbout.value = userAbout;
}
function handleSubmitForm(evt){
  evt.preventDefault();
  document.querySelector(".profile__name").textContent = document.querySelector("#edit-popup__input-name").value;
  document.querySelector(".profile__occupation").textContent = document.querySelector("#edit-popup__input-about").value;
  editPopup.classList.remove("popup_visible");
}
function handleLikeButton(evt){
  evt.target.classList.toggle("card__like-button_active");
}
function handleDeleteButton(evt){
  evt.target.parentElement.parentElement.remove();
}
function openImage(evt){
  const link = evt.target.src;
  const caption = evt.target.alt;
  document.querySelector(".picture-popup__image").src = link;
  document.querySelector(".picture-popup__image").alt = caption;
  document.querySelector(".picture-popup__caption").textContent = caption;
  document.querySelector(".picture-popup__close-button").addEventListener("click", handleCloseButton);
  picturePopup.classList.add("popup_visible");
}
function handleAddButton(){
  addPopup.classList.add("popup_visible");
  document.querySelector(".add-popup__close-button").addEventListener("click", handleCloseButton);
}
function handleAddform(evt){
  evt.preventDefault;
  const link = document.querySelector("#add-popup__input-link").value;
  const caption = document.querySelector("#add-popup__input-description").value;
  addNewCard(link, caption);
  addPopup.classList.remove("popup_visible");
}
function addNewCard(link, caption){
  console.log(link);
  console.log(caption);
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__description").textContent = caption;
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = caption;
  cardElement.querySelector(".card__like-button").addEventListener("click" ,handleLikeButton);
  cardElement.querySelector(".card__delete-button").addEventListener("click" ,handleDeleteButton);
  cardElement.querySelector(".card__image").addEventListener("click" ,openImage);

  gallery.prepend(cardElement);
}
// Event listeners binding with elements
editPopupCloseButton.addEventListener("click", handleCloseButton);
editButton.addEventListener("click", handleEditButton);
editForm.addEventListener("submit", handleSubmitForm);
addForm.addEventListener("submit", handleAddform);
addButton.addEventListener("click", handleAddButton);

likeButtons.forEach(button=>{
  button.addEventListener("click", handleLikeButton);
});
deleteButtons.forEach(button=>{
  button.addEventListener("click", handleDeleteButton);
});
cardImages.forEach(img=>{
  img.addEventListener("click", openImage);
});