import './style.css';
import Leaderboard from './modules/constructor.js';

const API_URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/1nHfN6b4Dsu57fnGRPem/scores';
const fetchAPIData = async () => {
  const request = await fetch(`${API_URL}`);
  const data = await request.json();
  data.result.sort((a, b) => b.score - a.score);

  const fetchContent = async (data) => {
    const leaderboard = document.getElementById('leaderboard');
    data.result.forEach((obj) => {
      leaderboard.innerHTML += `
                <tr>
                <td>${obj.user} : ${obj.score}</td>
                </tr>
            `;
    });
  };

  fetchContent(data);
};

const postData = async (val) => {
  const content = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user: val.name,
      score: val.score,
    }),
  });
  const waitingContent = await content.json();
  return waitingContent;
};

const scores = document.getElementById('leaderboard');
const leaderboardInput = document.getElementById('leaderboardInput');
const nameInput = document.getElementById('name-input');
const scoreInput = document.getElementById('score-input');

leaderboardInput.addEventListener('submit', (event) => {
  const leaderboard = new Leaderboard(nameInput.value, scoreInput.value);
  event.preventDefault();
  postData(leaderboard);
  scores.innerHTML = '';
  nameInput.value = '';
  scoreInput.value = '';
  fetchAPIData();
});

const refreshBtn = document.getElementById('refresh-button');
refreshBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  scores.innerHTML = '';
  fetchAPIData();
});

window.addEventListener('DOMContentLoaded', fetchAPIData);
