let closeButton = document.querySelector(".popup__close-button");
let editButton = document.querySelector(".profile__edit-button");
let editForm = document.querySelector(".popup__edit-form");
let popup = document.querySelector(".popup");

function handleCloseButton(){
  popup.classList.remove("popup_visible");

}
function handleEditButton(){
  popup.classList.add("popup_visible");
  let userName = document.querySelector(".profile__name").textContent;
  let userAbout = document.querySelector(".profile__occupation").textContent;
  let inputName = document.querySelector("#popup__input-name");
  let inputAbout = document.querySelector("#popup__input-about");
  inputName.value = userName;
  inputAbout.value = userAbout;
}
function handleSubmitForm(evt){
  evt.preventDefault();
  document.querySelector(".profile__name").textContent = document.querySelector("#popup__input-name").value;
  document.querySelector(".profile__occupation").textContent = document.querySelector("#popup__input-about").value;
  popup.classList.remove("popup_visible");
}
closeButton.addEventListener("click", handleCloseButton);
editButton.addEventListener("click", handleEditButton);
editForm.addEventListener("submit", handleSubmitForm);