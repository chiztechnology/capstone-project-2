import getData from './getData.js';
import generateCards from './generateCards.js';
import popupGenerator from './popupGenerator.js';
import InvolvementAPI from './involvementAPI.js';
import likeCounter from './likeCounter.js';
import commentCounter from './commentCounter.js';

const popup = document.querySelector('.popup');

const players = ['Lionel Messi', 'Cristiano Ronaldo',
  'Michael Jordan', 'LeBron James', 'Kareem Abdul-Jabbar',
  'Michael Phelps', 'Andres Iniesta', 'Dani Alves', 'Tom Brady'];
const cards = document.querySelector('.players-container');
cards.innerHTML = '';
let displayData = [];
const popupArray = [];
let view;
let likeButton;

const loading = document.createTextNode('Loading ...');
cards.append(loading);

export const getPlayer = async () => {
  for (let i = 0; i < players.length; i += 1) {
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${players[i]}`;
    const playerDetails = await getData(url);
    const playerDetailsArray = playerDetails.player;
    popupArray.push(playerDetailsArray);
    const likes = await likeCounter(playerDetailsArray[0].idPlayer);
    const allComments = await commentCounter(playerDetailsArray[0].idPlayer);
    const card = generateCards(playerDetailsArray[0].idPlayer, playerDetailsArray[0].strThumb, playerDetailsArray[0].strPlayer, likes, allComments.length);
    displayData.push(card);
    if (displayData.length === players.length) {
      cards.innerHTML = (displayData).join(' ');
      displayData = [];
      view = document.querySelectorAll('.view');
      likeButton = document.querySelectorAll('.like');
    }
  }
  loading.remove();
  likeButton.forEach((element) => {
    element.addEventListener('click', async () => {
      const { id } = element;
      await InvolvementAPI.postLike(id);
      const elementLike = await likeCounter(id);
      document.getElementById(id).innerHTML = `Like ${elementLike} &#128077`;
    });
  });
  view.forEach((element) => {
    element.addEventListener('click', async () => {
      const allComments = await commentCounter(element.id);
      if (allComments.length !== 0) {
        var lastComment = allComments.length - 1;
      }
      for (let i = 0; i < popupArray.length; i += 1) {
        if (popupArray[i][0].idPlayer === element.id) {
          if (allComments.length === 0) {
            popupGenerator(popupArray[i][0].strThumb, popupArray[i][0].strPlayer, popupArray[i][0].strDescriptionEN);
            break;
          } else {
            popupGenerator(popupArray[i][0].strThumb, popupArray[i][0].strPlayer, popupArray[i][0].strDescriptionEN, allComments[lastComment].username, allComments[lastComment].comment, allComments[lastComment].creation_date, allComments.length);
            break;
          }
        }
      }
      const close = document.querySelector('.close');
      close.addEventListener('click', () => {
        popup.innerHTML = '';
      });
    });
  });
};