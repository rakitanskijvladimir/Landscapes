import "./index.css";
import { listOfCards } from "./scripts/cards.js";
import {
  placesList,
  profileEditButton,
  profileName,
  profileDescription,
  imagePopup,
  popupImage,
  popupCaption,
  avatarImage,
  popupList,
} from "./scripts/constans.js";

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
  if (event.key === "Escape") {
    // Имя клавиши на которую я нажал log попробовать
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}

// === функция создания карточки и внесения в нее различных данных ==============
function createCard(
  cardData,
  handleCardClick,
  handleDeleteCard,
  handleLikeClick
) {

  // создаю функцию "createCard" с параметрами данные карточек и удаление карточек
  const cardTemplate = document.getElementById("card-template"); // создаю переменную "templateElement" для поиска шаблона в html(верстке)
  const CARDS = cardTemplate.content.cloneNode(true).firstElementChild; // создаю переменную "CARDS" для клонирования карточек на страницу

  const imageCards = CARDS.querySelector(".card__image"); // создаю переменную "imageCards" для добавление фото карточки в нужное место '.card__image'
  const cardTitle = CARDS.querySelector(".card__title"); // создаю переменную "textCard" для добавление текста карточки в нужное место '.card__title'
  const deleteButton = CARDS.querySelector(".card__delete-button"); // создаю переменную "deleteButton" для нах. элемента в html(верстке)
  const likeButton = CARDS.querySelector(".card__like-button"); // создаю переменную "likeButton" для нахождения элемента в html(верстке)

  imageCards.src = cardData.link;
  imageCards.alt = cardData.alt;
  cardTitle.textContent = cardData.name;
  popupList.textContent = cardData.text;

  likeButton.addEventListener("click", () => {
    handleLikeClick(likeButton, cardData);
  });

  deleteButton.addEventListener("click", () => {
    handleDeleteCard(CARDS);
  });

  imageCards.addEventListener("click", () => {
    handleCardClick(cardData.link, cardData.name, cardData.name);
  });




  // Добавляем обработчик для кнопки редактирования (если есть)
  if (profileEditButton) {
    profileEditButton.addEventListener("click", () => {
      // Находим попап и его текстовое поле (если ещё не определено)
      const popupList = document.querySelector('.popup__text'); // или другой селектор
      if (popupList) {
        popupList.textContent = cardData.text;
      }
    });
  }
  return CARDS;
}
















//* Пример с кликом по блокам страницы *//

// const map = {
//   profile__image: "я кликнул по аватару",
//   card__image: "я кликнул по фото",
//   content: "я кликнул по браузеру",
//   popup__close: "я кликаю по закрытию",
//   "card__like-button": "я кликаю по лайку",
// };

// const body = document.querySelector("body");
// body.addEventListener("click", (e) => {
//   console.log(map[e.target.classList]);

// });

const archiv = {
  avatarImage: "",
  profileName: "",
  profileDescription: "ставь лайк ниже",
};

// ======= функция для лайка карточки
let activeCard = null;

// Убедимся, что слушатель у profileEditButton повешен один раз
document.addEventListener("DOMContentLoaded", function () {
  const profileEditButton = document.querySelector(".profile__edit-button");

  if (profileEditButton) {
    profileEditButton.addEventListener("click", function () {
      openModal(avatarModalPopup);
    });
  }
});

function likeCard(likeButton, cardData) {
  const isActive = likeButton.classList.contains("card__like-button_is-active");
  const allLikeButtons = document.querySelectorAll(".card__like-button");

  // Сбрасываем все лайки
  allLikeButtons.forEach((btn) => {
    btn.classList.remove("card__like-button_is-active");
  });

  // Если клик по уже активной карточке — снимаем лайк
  if (isActive) {
    avatarImage.src = archiv.avatarImage;
    profileEditButton.hidden = true;
    profileName.textContent = "";
    profileDescription.textContent = archiv.profileDescription;
    activeCard = null;
    return;
  }

  // Включаем лайк только на этой карточке
  likeButton.classList.add("card__like-button_is-active");

  // Обновляем данные профиля
  if (avatarImage && cardData?.link) {
    avatarImage.src = cardData.link;
  }

  if (profileEditButton) {
    profileEditButton.hidden = false;
  }

  if (profileName) {
    profileName.textContent = "описание картины ==>";
  }

  if (profileDescription && cardData?.name) {
    profileDescription.textContent = cardData.name;
  }

  activeCard = cardData;
}

// =======  функции по закрытию попапов (клик по крестику и  рядом)
const closeModalOut = (popup) => {
  closeModal(popup);

  // Восстановление всех like-кнопок
  const likeButtons = document.querySelectorAll(".card__like-button");
  likeButtons.forEach((likeButton) => {
    likeButton.classList.remove("card__like-button_is-active");
  });

  const avatarImage = document.querySelector(".profile__image");
  const profileEditButton = document.querySelector(".profile__edit-button");
  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  // картинка в кружочке
  if (avatarImage) {
    avatarImage.src = archiv.avatarImage;
  }

  // кнопка описания
  if (profileEditButton) {
    profileEditButton.hidden = true;
  }

  // описание картины со стрелкой
  if (profileName) {
    profileName.textContent = archiv.profileName || "";
  }

  // название картины
  if (profileDescription) {
    profileDescription.textContent = archiv.profileDescription || "";
  }
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

// // при клике на "плюс" октрываю форму для заполнения карточек
// profileAddButton.addEventListener("click", () => {
//   openModal(addCardPopup);
// });

// при отправки формы "плюс" сохраняю текст (в браузере и форме) который был в заполненных полях
// addCardForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const newCardData = {
//     name: (cardNameInput.value = "запрос ушел"),
//     link: (cardLinkInput.value = "ожидаем!"),
//   };

//   addCard(newCardData, placesList, handleCardClick, deleteCard);
//   cardNameInput.value = "";
//   cardLinkInput.value = "";
//   closeModal(addCardPopup);
// });

// ===== функция для плавное открывание попапов
document
  .querySelectorAll(".popup")
  .forEach((popup) => popup.classList.add("popup_is-animated"));

function addCard(
  cardData,
  placesList,
  handleCardClick,
  handleDeleteCard,
  handleLikeClick,
  handleTextCLick
) {
  const objectCard = createCard(
    cardData,
    handleCardClick,
    handleDeleteCard,
    handleLikeClick,
    handleTextCLick
  );
  placesList.prepend(objectCard);
}

listOfCards.forEach((cardData) => {
  addCard(cardData, placesList, handleCardClick, deleteCard, likeCard);
});
