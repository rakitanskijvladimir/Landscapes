
import "./index.css";
import { listOfCards } from "./scripts/cards.js";
// import { enableValidation } from "./scripts/validation.js"
import { placesList,
  profileEditButton,
  profileName,
  profileDescription,
  addCardPopup,
  profileAddButton,
  addCardForm,
  cardNameInput,
  cardLinkInput,
  imagePopup,
  popupImage,
  popupCaption,
  avatarImage,
  avatarModalPopup,
  popupList

} from "./scripts/constans.js"



// ======== Функции =========
function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscapeClose);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscapeClose);
}

function handleEscapeClose(event) {
  if (event.key === "Escape") { // Имя клавиши на которую я нажал log попробовать
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}








// === функция создания карточки и внесения в нее различных данных ==============
function createCard(cardData, handleCardClick, handleDeleteCard, handleLikeClick) {    // создаю функцию "createCard" с параметрами данные карточек и удаление карточек

const cardTemplate = document.getElementById("card-template");                        // создаю переменную "templateElement" для поиска шаблона в html(верстке)
const CARDS = cardTemplate.content.cloneNode(true).firstElementChild;               // создаю переменную "CARDS" для клонирования карточек на страницу
  
const imageCards = CARDS.querySelector(".card__image");                          // создаю переменную "imageCards" для добавление фото карточки в нужное место '.card__image'
const cardTitle = CARDS.querySelector(".card__title");                           // создаю переменную "textCard" для добавление текста карточки в нужное место '.card__title'
const deleteButton = CARDS.querySelector(".card__delete-button");               // создаю переменную "deleteButton" для нах. элемента в html(верстке)
const likeButton = CARDS.querySelector(".card__like-button");                   // создаю переменную "likeButton" для нахождения элемента в html(верстке)


  imageCards.src = cardData.link;
  imageCards.alt = cardData.alt;
  cardTitle.textContent = cardData.name;
  popupList.textContent = cardData.text

  likeButton.addEventListener("click", () => {
    handleLikeClick(likeButton, cardData)
    // handleTextCLick(cardData.link);
  });

  deleteButton.addEventListener("click", () => {
    handleDeleteCard(CARDS);
  });

  imageCards.addEventListener("click", () => {
    handleCardClick(cardData.link, cardData.name, cardData.name);
    
  });

// ==== функция открытия аватара по клику на название под картинкой === 
function handleTextCLick() {
  // console.log('link ==> ', link);
  avatarImage.src = cardData.link;
  profileName.textContent = 'описание картины ==>'
  profileDescription.textContent = cardData.name;
  profileEditButton.classList.add('profile__edit-button_active');

  profileEditButton.addEventListener("click", () => {
    // console.log('popupText',  popupText);
    const vasia = avatarModalPopup.querySelector('.popup__title')
    vasia.textContent = profileDescription.textContent;
    const varia = avatarModalPopup.querySelector('.popup__text')
    varia.textContent = cardData.text;
    openModal(avatarModalPopup);
  });
}

  return CARDS;

};


const map = {
  "profile__image": 'я кликнул по аватару',
  'card__image': 'я кликнул по фото',
  'content': 'я кликнул по браузеру',
  'popup__close': 'я кликаю по закрытию',
  'card__like-button': 'я кликаю по лайку',

}



const body  = document.querySelector('body')
body.addEventListener('click', (e) => {
  console.log(map[e.target.classList]);

//   if (e.target.classList[0] === "profile__image") {
// console.log('я кликнул по аватару');
});
  


const archiv = {
   'avatarImage': '',
   'profileName': '',
   'profileDescription': 'ставь лайк ниже',
 }

// ======= функция для лайка карточки
function likeCard(likeButton, cardData) {
  const mass = [...likeButton.classList]
  // console.log(mass);
  
  let mass2 = mass.includes('card__like-button_is-active')
  

    if (!mass2) {
      likeButton.classList.add('card__like-button_is-active')

      // archiv.avatarImage = avatarImage.src
      avatarImage.src = cardData.link;

      // archiv.profileName = profileName.textContent;
      profileName.textContent = 'описание картины ==>'

      // archiv.profileDescription = profileDescription.textContent;
      profileDescription.textContent = cardData.name;

      profileEditButton.classList.add('profile__edit-button_active');

    } else {
      likeButton.classList.remove('card__like-button_is-active');
      avatarImage.src = archiv.avatarImage;
      profileName.textContent = '';
      profileDescription.textContent = archiv.profileDescription;
      
    }
    
    // console.log('archiv ==>', archiv);
    
  }

  









// ======  функция для удаления карточки
function deleteCard(CARDS) {
  CARDS.remove();
}



// ======= функция для открытия картинки и попапов при клики 
function handleCardClick(link, alt, name) {
  popupImage.src = link;
  popupImage.alt = alt;
  popupCaption.textContent = name;
  openModal(imagePopup);
}





// при клике на "плюс" октрываю форму для заполнения карточек
profileAddButton.addEventListener("click", () => {
  openModal(addCardPopup);
});
// при отправки формы "плюс" сохраняю текст (в браузере и форме) который был в заполненных полях
addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCardData = {
    name: cardNameInput.value = "запрос ушел",
    link: cardLinkInput.value = "ожидаем!",
  };

  addCard(newCardData, placesList, handleCardClick, deleteCard);
  cardNameInput.value = "";
  cardLinkInput.value = "";
  closeModal(addCardPopup);
});




// =======  функции по закрытию попапов (клик по крестику и  рядом)
const closeModalOut = (popup) => {
  closeModal(popup);
};
const setCloseListener = () => {
  const popupList = Array.from(document.querySelectorAll(".popup"));
  popupList.forEach((popup) => {
    popup.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("popup") ||
        event.target.classList.contains("popup__close")
      ) {
        closeModalOut(popup);
      }
    });
  });
};

setCloseListener();




// ===== функция для плавное открывание попапов
document
  .querySelectorAll(".popup")
  .forEach((popup) => popup.classList.add("popup_is-animated"));






  function addCard(cardData, placesList, handleCardClick, handleDeleteCard, handleLikeClick, handleTextCLick) {
  // function addCard(placesList, ...option) {
    const objectCard = createCard(cardData,handleCardClick,handleDeleteCard,handleLikeClick, handleTextCLick);
    // const objectCard = createCard(option);
    placesList.prepend(objectCard);
  }


  

  listOfCards.forEach((cardData) => {
    // const option = {cardData, placesList, handleCardClick, deleteCard, likeCard} 
  addCard(cardData, placesList, handleCardClick, deleteCard, likeCard);
});







