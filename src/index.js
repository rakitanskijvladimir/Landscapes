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
} from "./scripts/constans.js";

// ================= Function Declaration (Объявления функции) ===================================================================== //
// ======== Функции =========
function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscapeClose);
}

// ================= Function Declaration (Объявления функции) ===================================================================== //
function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscapeClose);
}

// ================= Function Declaration (Объявления функции) ===================================================================== //
function handleEscapeClose(event) {
  if (event.key === "Escape") {
    // Имя клавиши на которую я нажал log попробовать
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}

// ======== Пример замыкания: счетчик лайков =========
// ================= Function Declaration (Объявления функции) ===================================================================== //
function createLikeCounter() {
  let likeCount = 0; // Эта переменная будет "замкнута" внутри возвращаемой функции

  return function (cardElement) {
    likeCount++;
    // console.log(`Карточка получила ${likeCount} лайк(ов)`);

    // Можем также обновить UI
    const counterElement = cardElement.querySelector(".card__like-counter");
    if (counterElement) {
      counterElement.textContent = likeCount;
    } else {
      const newCounter = document.createElement("span");
      newCounter.classList.add("card__like-counter");
      newCounter.textContent = likeCount;
      cardElement.querySelector(".card__like-button").append(newCounter);
    }

    return likeCount;
  };
}

// Создаём экземпляр счётчика
const likeCounter = createLikeCounter();

// ================= Function Declaration (Объявления функции) ===================================================================== //
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

  // ================= Function Declaration (Объявления функции) ===================================================================== //
  // Используем замыкание
  likeButton.addEventListener("click", () => {
    likeCounter(CARDS); // передаём карточку в счётчик
    handleLikeClick(likeButton, cardData);
  });

  // ================= Function Declaration (Объявления функции) ===================================================================== //
  deleteButton.addEventListener("click", () => {
    handleDeleteCard(CARDS);
  });

  // ================= Function Declaration (Объявления функции) ===================================================================== //
  imageCards.addEventListener("click", () => {
    handleCardClick(cardData.link, cardData.name, cardData.name);
  });

  return CARDS;
}

// =========== Пример с кликом по блокам страницы //

// const map = {
//   profile__image: "я кликнул по аватару",
//   card__image: "я кликнул по фото",
//   content: "я кликнул по браузеру",
//   popup__close: "я кликаю по закрытию",
//   "card__like-button": "я кликаю по лайку",А
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

// ================= Function Declaration (Объявления функции) ===================================================================== //
// ======= функция для лайка карточки
let activeCard = null; // Храним данные активной карточки

function likeCard(likeButton, cardData) {
  const isActive = likeButton.classList.contains("card__like-button_is-active");
  const allLikeButtons = document.querySelectorAll(".card__like-button");

  // Сбрасываем все лайки
  allLikeButtons.forEach((btn) => {
    btn.classList.remove("card__like-button_is-active");
  });

  if (isActive) {
    // Если лайк снят
    avatarImage.src = archiv.avatarImage;
    profileEditButton.hidden = true;
    profileName.textContent = "";
    profileDescription.textContent = archiv.profileDescription;
    activeCard = null;
    return;
  }

  // Ставим лайк и сохраняем карточку
  likeButton.classList.add("card__like-button_is-active");
  avatarImage.src = cardData.link;
  profileEditButton.hidden = false;
  profileName.textContent = "описание картины ==>";
  profileDescription.textContent = cardData.name;
  activeCard = cardData; // Сохраняем данные карточки
}

// ================= Function Expression (Функциональное выражение) ===================================================================== //
profileEditButton.addEventListener("click", function () {
  // Находим элементы в попапе
  const popupText = document.querySelector("#avatarModalPopup .popup__text");
  const popupTitle = document.querySelector("#avatarModalPopup .popup__title");

  if (popupText && popupTitle) {
    popupText.textContent = activeCard.text;
    popupTitle.textContent = activeCard.name;
  }
  openModal(avatarModalPopup);
});

// ================= Arrow Function (Стрелочные функции) ===================================================================== //
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

// ================= Arrow Function (Стрелочные функции) ===================================================================== //
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

// ================= Function Declaration (Объявления функции) ===================================================================== //
// ======  функция для удаления карточки
function deleteCard(CARDS) {
  CARDS.remove();
}

// ================= Function Declaration (Объявления функции) ===================================================================== //
// ======= функция для открытия картинки и попапов при клики
function handleCardClick(link, alt, name) {
  popupImage.src = link;
  popupImage.alt = alt;
  popupCaption.textContent = name;
  openModal(imagePopup);
}

// ================= Function Declaration (Объявления функции) ===================================================================== //
// ===== функция для плавное открывание попапов
document
  .querySelectorAll(".popup")
  .forEach((popup) => popup.classList.add("popup_is-animated"));

// ================= Function Declaration (Объявления функции) ===================================================================== //
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
