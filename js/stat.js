'use strict';
/*поле статистики*/
const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP_CLOUD = 10;
/*текст*/
const TEXT_WIDTH = 50;
const FONT_SIZE = `16px`;
const FONT_FAMILY = `PT Mono`;
const FONT_GAP = 20;
const COLOR_TEXT = 'rgba(0, 0, 0, 0.7)';
/*гистограмма*/
const GAP_BAR = 50;
const BAR_WIDTH = 40;
const MAX_HEIGHT = 150;
let barHeight = MAX_HEIGHT;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(
    ctx,
    CLOUD_X + GAP_CLOUD,
    CLOUD_Y + GAP_CLOUD,
    'rgba(0, 0, 0, 0.7)'
  );
  renderCloud(
    ctx,
    CLOUD_X,
    CLOUD_Y,
    '#fff'
  );

  ctx.font = FONT_SIZE + FONT_FAMILY;
  ctx.fillStyle = COLOR_TEXT;
  ctx.textAlign = 'center';

  ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов: ', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + FONT_GAP * 2);

  ctx.textAlign = 'left';

  var maxTime = getMaxElement(times);
  for (var i = 0; i < players.length; i++) {
    barHeight = (barHeight * times[i]) / maxTime;
    ctx.fillText(
      Math.ceil(times[i]),
      CLOUD_X + GAP_BAR + (BAR_WIDTH + GAP_BAR) * i,
      CLOUD_HEIGHT - barHeight - FONT_GAP * 2,
    );

    if (players[i] !== 'Вы') {
      ctx.fillStyle = 'hsl(235,' + (Math.random() * 100) + '%, ' + (Math.random() * 50) + '%)';
    } else {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }

    ctx.fillRect(
      CLOUD_X + GAP_BAR + (BAR_WIDTH + GAP_BAR) * i,
      CLOUD_HEIGHT - barHeight - FONT_GAP * 1.5,
      BAR_WIDTH,
      barHeight,
    );

    ctx.fillStyle = COLOR_TEXT;
    ctx.fillText(
      players[i],
      CLOUD_X + GAP_BAR + (BAR_WIDTH + GAP_BAR) * i,
      CLOUD_HEIGHT - FONT_GAP / 2
    );
  }
};
