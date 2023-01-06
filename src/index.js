/* eslint-disable*/
import './style.css';

class Leaderboard {
    constructor(name, score) {
      this.name = name;
      this.score = score;
    }
  }

  const API_URL = "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/123/scores";

  const fetchAPIData = async () => {

    const request = await fetch(`${API_URL}`);
    const data = await request.json();
    data.result.sort((a, b) => {
      return b.score - a.score;
    });
  
    const fetchContent = async (data) => {
      const leaderboard = document.getElementById('leaderboard');
      data.result.forEach((obj) => {
        leaderboard.innerHTML += `
                <p>${obj.user} : ${obj.score}</p>
            `;
      });
    };
  
    fetchContent(data);
  };

  
  const postData = async (val) => {
      
      const content = await fetch(`${API_URL}`, {
        method: "POST",
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
    const leaderboardInput = document.getElementById('leaderboardInput')
    const nameInput = document.getElementById('name-input');
    const scoreInput = document.getElementById('score-input');
  
    leaderboardInput.addEventListener("submit", event => {
    const leaderboard = new Leaderboard(nameInput.value, scoreInput.value);
    event.preventDefault();
    postData(leaderboard);
    scores.innerHTML = "";
    nameInput.value = "";
    scoreInput.value = "";
    setTimeout(fetchAPIData, 300);
    });

  const refreshBtn = document.getElementById('refresh-button');
  refreshBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    scores.innerHTML = "";
    fetchAPIData();
  });
  

  window.addEventListener("DOMContentLoaded", fetchAPIData);
