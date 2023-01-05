import getData from './getData.js';
import generateCards from './generateCards.js';

const players = ['Lionel Messi', 'Cristiano Ronaldo',
  'Michael Jordan', 'LeBron James', 'Kareem Abdul-Jabbar',
  'Michael Phelps', 'Andres Iniesta', 'Dani Alves', 'Tom Brady'];
const cards = document.querySelector('.players-container');
cards.innerHTML = '';
let displayData = [];

let loading = document.createTextNode('Loading ...');
cards.append(loading);

export const getPlayer = async () => {
  for (let i = 0; i < players.length; i += 1) {
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${players[i]}`;
    const playerDetails = await getData(url);
    const playerDetailsArray = playerDetails.player;
    const card = generateCards(playerDetailsArray[0].strThumb, playerDetailsArray[0].strPlayer);
    displayData.push(card);
    if (displayData.length === players.length) {
      cards.innerHTML = (displayData).join(' ');
      displayData = [];
    }
  }

  loading.remove();
};