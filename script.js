// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDYJFmTyC0bg88stR33nBlhaZPz5ENtoCE",
  authDomain: "uvi-web-app-8ec1e.firebaseapp.com",
  databaseURL: "https://uvi-web-app-8ec1e-default-rtdb.firebaseio.com",
  projectId: "uvi-web-app-8ec1e",
  storageBucket: "uvi-web-app-8ec1e.appspot.com",
  messagingSenderId: "90541572237",
  appId: "1:90541572237:web:6f59215375cab9e545a2c4"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const songListContainer = document.querySelector('.song-list');
const nowPlaying = document.querySelector('.now-playing');

function renderSongCard(song) {
  const card = document.createElement('div');
  card.className = 'song-card';

  card.innerHTML = `
    <img class="song-thumbnail" src="${song.thumbnail}" alt="cover" />
    <div class="song-info">
      <p class="song-title">${song.title}</p>
      <p class="song-category">${song.category || 'Unknown'}</p>
    </div>
    <button class="play-btn">Play</button>
  `;

  card.querySelector('.play-btn').addEventListener('click', () => {
    playSong(song);
  });

  songListContainer.appendChild(card);
}

function playSong(song) {
  nowPlaying.classList.add('show');
  nowPlaying.innerHTML = `
    <img src="${song.thumbnail}" alt="cover" />
    <div class="title">${song.title}</div>
    <audio controls autoplay src="${song.audio_url}"></audio>
  `;
}

// Load songs from Firebase
function loadSongs() {
  db.ref('songs').on('value', snapshot => {
    const songs = snapshot.val();
    songListContainer.innerHTML = '';
    for (let id in songs) {
      renderSongCard(songs[id]);
    }
  });
}

loadSongs();
