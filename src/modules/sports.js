import getData from './getData.js';
import generateCards from './generateCards.js';

const url = 'https://www.thesportsdb.com/api/v1/json/2/all_sports.php';
const cards = document.querySelector('.cards');
cards.innerHTML = '';
let displayData = [];

export const sports = async () => {
  const allSports = await getData(url);
  const allSportsArray = allSports.sports;
  for (let i = 0; i < allSportsArray.length; i += 1) {
    const card = generateCards(allSportsArray[i].strSportThumb, allSportsArray[i].strSport);
    displayData.push(card);
  }
  if (displayData.length === allSportsArray.length) {
    cards.innerHTML = (displayData).join(' ');
    displayData = [];
  }
};