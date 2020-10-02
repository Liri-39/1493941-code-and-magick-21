'use strict';

const WIZARD_FIERYBALL_COLOR = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
const WIZARD_FIRST_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_SECOND_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const WIZARDS_COAT_COLOR = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const WIZARDS_EYES_COLOR = [`black`, `red`, `blue`, `yellow`, `green`];
const PLAYERS = 4;
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 25;

const wizards = [];

const setupOpen = document.querySelector(`.setup-open`);
const setup = document.querySelector(`.setup`);
const setupClose = setup.querySelector(`.setup-close`);

const userDialog = document.querySelector(`.setup`);
const userNameInput = userDialog.querySelector(`.setup-user-name`);

const player = document.querySelector(`.setup-player`);
const userCoatColorInput = player.querySelector(`input[name="coat-color"]`);
const userEyesColorInput = player.querySelector(`input[name="eyes-color"]`);
const userFieryballColorInput = player.querySelector(`input[name="fireball-color"]`);

const wizardBody = document.querySelector(`.setup-wizard`);
const userFieryballColor = document.querySelector(`.setup-fireball-wrap`);

const fragment = document.createDocumentFragment();
const similarListElement = userDialog.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);

const randomValue = function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getWizardName = function () {
  const i = randomValue(0, WIZARD_FIRST_NAMES.length - 1);
  const j = randomValue(0, WIZARD_SECOND_NAMES.length - 1);
  const wizardName = WIZARD_FIRST_NAMES[i] + ` ` + WIZARD_SECOND_NAMES[j];
  return wizardName;
};

const getWizardCoatColor = function () {
  const i = randomValue(0, WIZARDS_COAT_COLOR.length - 1);
  const wizardCoatColor = WIZARDS_COAT_COLOR[i];
  return wizardCoatColor;
};

const getWizardEyesColor = function () {
  const i = randomValue(0, WIZARDS_EYES_COLOR.length - 1);
  const wizardEyesColor = WIZARDS_EYES_COLOR[i];
  return wizardEyesColor;
};

const onPopupEscPress = function (evt) {
  if ((evt.key === `Escape`) && (!evt.target.matches(`.setup-user-name`))) {
    evt.preventDefault();
    closePopup();
  }
};

const onFieryballClick = function () {
  const i = randomValue(0, WIZARD_FIERYBALL_COLOR.length - 1);
  userFieryballColor.style.backgroundColor = WIZARD_FIERYBALL_COLOR[i];
  userFieryballColorInput.value = WIZARD_FIERYBALL_COLOR[i];
};

const onWizardClick = function (evt) {
  if (evt.target.matches(`.wizard-coat`)) {
    const i = randomValue(0, WIZARDS_COAT_COLOR.length - 1);
    wizardBody.querySelector(`.wizard-coat`).style.fill = WIZARDS_COAT_COLOR[i];
    userCoatColorInput.value = WIZARDS_COAT_COLOR[i];
  }
  if (evt.target.matches(`.wizard-eyes`)) {
    const j = randomValue(0, WIZARDS_EYES_COLOR.length - 1);
    wizardBody.querySelector(`.wizard-eyes`).style.fill = WIZARDS_EYES_COLOR[j];
    userEyesColorInput.value = WIZARDS_EYES_COLOR[j];
  }
};

const openPopup = function () {
  setup.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
  userFieryballColor.addEventListener(`click`, onFieryballClick);
  wizardBody.addEventListener(`click`, onWizardClick);
  setupClose.addEventListener(`click`, function () {
    closePopup();
  });
  setupClose.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      closePopup();
    }
  });

};

const closePopup = function () {
  setup.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
  userFieryballColor.removeEventListener(`click`, onFieryballClick);
  wizardBody.removeEventListener(`click`, onWizardClick);
};

userNameInput.addEventListener(`input`, function () {
  let valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity(`Ещё ${(MIN_NAME_LENGTH - valueLength)} симв.`);
  } else if (valueLength < MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity(`Можете ввести еще ${(MAX_NAME_LENGTH - valueLength)} симв.`);
  } else {
    userNameInput.setCustomValidity(``);
  }

  userNameInput.reportValidity();
});


setupOpen.addEventListener(`click`, function () {
  openPopup();
});

setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

for (let i = 0; i < PLAYERS; i++) {
  wizards.push({
    name: getWizardName(),
    coatColor: getWizardCoatColor(),
    eyesColor: getWizardEyesColor()
  });
}

const renderWizard = function (wizard) {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

for (let i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
