
export const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };

export const placesList = document.querySelector(".places__list");                             // пер место в браузере куда добавляю все карточки


export const editProfilePopup = document.getElementById("editProfilePopup");                       // создание попапа для редактирования профиля
export const profileEditButton = document.querySelector(".profile__edit-button");                  // пер для кнопки редактирования профиля
export const profileName = document.querySelector(".profile__title");                              // пер для ввода имени в профиль
export const profileDescription = document.querySelector(".profile__description");                 // пер для ввода описания в профиль
export const editProfileForm = document.getElementById("editProfileForm");                         // пер для работы с формой редактирования профиля
export const profileNameInput = editProfileForm.querySelector(".popup__input_type_name");          // пер для работы с инпутом ИМЯ в редактировании профиля
export const profileJobInput = editProfileForm.querySelector(".popup__input_type_description");    // пер для работы с инпутом ОПИСАНИЕМ редактирования профиля


export const addCardPopup = document.getElementById("addCardPopup");                               // создание попапа для добавления карточки
export const profileAddButton = document.querySelector(".profile__add-button");                 // пер для кнопки добавления карточки
export const addCardForm = document.forms["addCardForm"];                                          // пер для работы с формой добавления карточек
export const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name");            // пер для работы с инпутом НАЗВАНИЕ КАРТИНКИ добавления карточки
export const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");                  // пер для работы с нипутом ЭЛ АДРЕС добавления карточки


export const imagePopup = document.getElementById("imagePopup");                                   // создание попапа для фото
export const popupImage = imagePopup.querySelector(".popup__image");                               // пер для добавления фото
export const popupCaption = imagePopup.querySelector(".popup__caption");                           // пер для добавления текста под фото

export const avatarModalPopup = document.getElementById("avatarModalPopup");                       // создание попапа для редактирования аватарки


export const editAvatarForm = document.getElementById("editAvatarForm");                           // пер для работы с формой аватара (ссылки на карточку)
export const avatarInput = document.querySelector('.popup__input_type_avatar')                        
export const avatarImage = document.querySelector('.profile__image')

export const popupText = document.querySelector('.popup__title')
export const cardTitle = document.querySelector('.card__title')
export const popupClose = document.querySelector('.popup__close')
export const popupList = document.querySelector('.popup__text');