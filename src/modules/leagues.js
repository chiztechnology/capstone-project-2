import getData from './getData.js';
import generateCards from './generateCards.js';
import popupGenerator from './popupGenerator.js';
import likeCounter from './likeCounter.js';
import InvolvementAPI from './involvementAPI.js';
import commentCounter from './commentCounter.js';

const popup = document.querySelector('.popup');
const popupArray = [];
let concatPopupArray = [];

const countries = ['England', 'Spain', 'France', 'Germany'];
const cards = document.querySelector('.league-container');
cards.innerHTML = '';
let displayData = [];
let view;
let likeButton;

const loading = document.createTextNode('Loading ...');
cards.append(loading);

export const getLeagues = async () => {
  for (let i = 0; i < countries.length; i += 1) {
    const url = `https://www.thesportsdb.com/api/v1/json/2/search_all_leagues.php?c=${countries[i]}`;
    const countryDetails = await getData(url);
    const countryDetailsArray = countryDetails.countries;
    popupArray.push(countryDetailsArray);
    const headline = `<h2>Leagues of ${countries[i]}</h2>`;
    displayData.push(headline);
    for (let j = 0; j < countryDetailsArray.length; j += 1) {
      if (countryDetailsArray[j].strLogo !== null && countryDetailsArray[j] !== null) {
        const likes = await likeCounter(countryDetailsArray[j].idLeague);
        const allComments = await commentCounter(countryDetailsArray[j].idLeague);
        const card = generateCards(countryDetailsArray[j].idLeague, countryDetailsArray[j].strLogo, countryDetailsArray[j].strLeague, likes, allComments.length);
        displayData.push(card);
      }
    }
  }
  for (let i = 0; i < popupArray.length; i += 1) {
    concatPopupArray = concatPopupArray.concat(popupArray[i]);
  }
  cards.innerHTML = (displayData).join(' ');
  likeButton = document.querySelectorAll('.like');
  likeButton.forEach((element) => {
    element.addEventListener('click', async () => {
      const { id } = element;
      await InvolvementAPI.postLike(id);
      const elementLike = await likeCounter(id);
      document.getElementById(id).innerHTML = `Like ${elementLike} &#128077`;
    });
  });
  view = document.querySelectorAll('.view');
  view.forEach((element) => {
    element.addEventListener('click', async () => {
      const allComments = await commentCounter(element.id);
      if (allComments.length !== 0) {
        var lastComment = allComments.length - 1;
      }
      for (let i = 0; i < concatPopupArray.length; i += 1) {
        if (concatPopupArray[i].idLeague === element.id) {
          if (allComments.length === 0) {
            popupGenerator(concatPopupArray[i].strLogo, concatPopupArray[i].strLeague, concatPopupArray[i].strDescriptionEN);
            break;
          } else {
            popupGenerator(concatPopupArray[i].strLogo, concatPopupArray[i].strLeague, concatPopupArray[i].strDescriptionEN, allComments[lastComment].username, allComments[lastComment].comment, allComments[lastComment].creation_date, allComments.length);
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
  displayData = [];
  loading.remove();
};