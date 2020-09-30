'use strict';
const WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
const WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
const WIZARDS_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, ,117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
const WIZARDS_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

const userDialog = document.querySelector('.setup');
const fragment = document.createDocumentFragment();
const similarListElement = userDialog.querySelector('.setup-similar-list');
const similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

const randomValue = function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const renderWizardName = function () {
  const i = randomValue(0, WIZARD_FIRST_NAMES.length - 1);
  const j = randomValue(0, WIZARD_SECOND_NAMES.length - 1);
  const wizardName = WIZARD_FIRST_NAMES[i] + ' ' + WIZARD_SECOND_NAMES[j];
  return wizardName;
};

const renderWizardCoatColor = function () {
  const i = randomValue(0, WIZARDS_COAT_COLOR.length - 1);
  const wizardCoatColor = WIZARDS_COAT_COLOR[i];
  return wizardCoatColor;
};

const renderWizardEyesColor = function () {
  const i = randomValue(0, WIZARDS_EYES_COLOR.length - 1);
  const wizardEyesColor = WIZARDS_EYES_COLOR[i];
  return wizardEyesColor;
};

let wizards = [];
for (let i = 0; i < 4; i++) {
  wizards.push({
    name: renderWizardName(),
    coatColor: renderWizardCoatColor(),
    eyesColor: renderWizardEyesColor()
  });
};

userDialog.classList.remove('hidden');

const renderWizard = function (wizards) {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizards.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizards.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards.eyesColor;

  return wizardElement;
}

for (let i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
