import getData from './getData.js';
import generateCards from './generateCards.js';
import popupGenerator from './popupGenerator.js';
import likeCounter from './likeCounter.js';
import InvolvementAPI from './involvementAPI.js';
import commentCounter from './commentCounter.js';

const popup = document.querySelector('.popup');

const url = 'https://www.thesportsdb.com/api/v1/json/2/all_sports.php';
const cards = document.querySelector('.sport-container');
cards.innerHTML = '';
let displayData = [];
const loading = document.createTextNode('Loading ...');
cards.append(loading);
let view;
let likeButton;

export const sports = async () => {
  const allSports = await getData(url);
  const allSportsArray = allSports.sports;
  for (let i = 0; i < allSportsArray.length; i += 1) {
    const likes = await likeCounter(allSportsArray[i].idSport);
    const allComments = await commentCounter(allSportsArray[i].idSport);
    const card = generateCards(allSportsArray[i].idSport, allSportsArray[i].strSportThumb, allSportsArray[i].strSport, likes, allComments.length);
    displayData.push(card);
  }
  if (displayData.length === allSportsArray.length) {
    cards.innerHTML = (displayData).join(' ');
    displayData = [];
    view = document.querySelectorAll('.view');
    likeButton = document.querySelectorAll('.like');
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
      const { id } = element;
      const allComments = await commentCounter(element.id);
      if (allComments.length !== 0) {
        var lastComment = allComments.length - 1;
      }
      for (let i = 0; i < allSportsArray.length; i += 1) {
        if (allSportsArray[i].idSport === element.id) {
          if (allComments.length === 0) {
            popupGenerator(allSportsArray[i].strSportThumb, allSportsArray[i].strSport, allSportsArray[i].strSportDescription);
            break;
          } else {
            popupGenerator(allSportsArray[i].strSportThumb, allSportsArray[i].strSport, allSportsArray[i].strSportDescription, allComments[lastComment].username, allComments[lastComment].comment, allComments[lastComment].creation_date, allComments.length);
            break;
          }
        }
      }
      const close = document.querySelector('.close');
      close.addEventListener('click', () => {
        popup.innerHTML = '';
      });
      const commentContainer = document.querySelector('.comments-container');
      const username = document.querySelector('.username');
      const comment = document.querySelector('.comment-text');
      const form = document.querySelector('form');
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const data = await InvolvementAPI.postComment(id, username.value, comment.value);
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // January is 0
        const day = currentDate.getDate();

        const dateString = `${year}-${month}-${day}`;

        const commentOnDom = document.createElement('h3');
        commentOnDom.innerHTML = `
        ${username.value} : ${comment.value} (${dateString})
        `;
        username.value = '';
        comment.value = '';
        commentContainer.appendChild(commentOnDom);
      });
    });
  });
};