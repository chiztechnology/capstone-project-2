import 'lodash'
import './style/styles.css';
import { sports } from './modules/sports.js';
import { getPlayer } from './modules/players.js';
import { getLeagues } from './modules/leagues.js';
const sportsHeader = document.querySelector('#sports');
const leaguesHeader = document.querySelector('#leagues');
const playerHeader = document.querySelector('#players');

window.addEventListener('DOMContentLoaded', () => {
  // hide other elements
  document.querySelector('.players-container').style.display = 'none';
  document.querySelector('.league-container').style.display = 'none';
  document.querySelector('.sport-container').style.display = 'flex';
  sports();
});

sportsHeader.addEventListener('click', () => {
  // hide other elements
  document.querySelector('.players-container').style.display = 'none';
  document.querySelector('.league-container').style.display = 'none';
  document.querySelector('.sport-container').style.display = 'flex';

  sports();
});

playerHeader.addEventListener('click', () => {
  // hide other elements
  document.querySelector('.sport-container').style.display = 'none';
  document.querySelector('.league-container').style.display = 'none';
  document.querySelector('.players-container').style.display = 'flex';

  getPlayer();
});

leaguesHeader.addEventListener('click', () => {
  // hide other elements
  document.querySelector('.sport-container').style.display = 'none';
  document.querySelector('.players-container').style.display = 'none';
  document.querySelector('.league-container').style.display = 'flex';

  getLeagues();
});
