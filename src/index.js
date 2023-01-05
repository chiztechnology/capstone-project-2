import 'lodash'
import './style/styles.css';
import { sports } from './modules/sports.js';
import { getPlayer } from './modules/players.js';
import { getLeagues } from './modules/leagues.js';
const sportsHeader = document.querySelector('#sports');
const leaguesHeader = document.querySelector('#leagues');
const playerHeader = document.querySelector('#players');

window.addEventListener('DOMContentLoaded', () => {
  sports();
});

sportsHeader.addEventListener('click', () => {
  sports();
});

playerHeader.addEventListener('click', () => {
  getPlayer();
});

leaguesHeader.addEventListener('click', () => {
  getLeagues();
});
