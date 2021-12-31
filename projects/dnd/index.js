/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

export function createDiv() {
  const element = document.createElement('div');
  element.setAttribute('draggable', true);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const red = getRandomInt(255);
  const green = getRandomInt(255);
  const blue = getRandomInt(255);

  element.classList.add('draggable-div');
  element.style.position = 'absolute';
  element.style.top = `${getRandomInt(300)}px`; // тест не пропускает getRandomInt(300) , хотя это рабочий вариант
  element.style.left = `${getRandomInt(300)}px`;
  element.style.width = `${getRandomInt(300)}px`;
  element.style.height = `${getRandomInt(300)}px`;
  element.style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';

  return element;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);

  div.onmousedown = function (event) {
    //DnD
    moveAt(event.pageX, event.pageY);
    function moveAt(pageX, pageY) {
      div.style.left = pageX - div.offsetWidth / 2 + 'px';
      div.style.top = pageY - div.offsetHeight / 2 + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    div.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      div.onmouseup = null;
    };

    div.ondragstart = function () {
      return false;
    };
  };
});
