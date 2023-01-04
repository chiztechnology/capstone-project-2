import getData from './getData.js';
import generateCards from './generateCards.js';

const countries = ['England', 'Spain', 'France', 'Germany'];
const cards = document.querySelector('.cards');
cards.innerHTML = '';
let displayData = [];

export const getLeagues = async () => {
  for (let i = 0; i < countries.length; i += 1) {
    const url = `https://www.thesportsdb.com/api/v1/json/2/search_all_leagues.php?c=${countries[i]}`;
    const countryDetails = await getData(url);
    const countryDetailsArray = countryDetails.countries;
    const headline = `<h2>Leagues of ${countries[i]}</h2>`;
    displayData.push(headline);
    for (let j = 0; j < countryDetailsArray.length; j += 1) {
      if (countryDetailsArray[j].strLogo !== null && countryDetailsArray[j] !== null) {
        const card = generateCards(countryDetailsArray[j].strLogo, countryDetailsArray[j].strLeague);
        displayData.push(card);
      }
    }
  }
  cards.innerHTML = (displayData).join(' ');
  displayData = [];
};