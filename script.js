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

const songList = document.getElementById('song-list');
const search = document.getElementById('search');
const mini = document.getElementById('mini-player');
const full = document.getElementById('full-player');

let currentSongIndex = 0;
let songs = [];

function createCard(song, index) {
  const div = document.createElement('div');
  div.className = 'song-card';
  div.innerHTML = `
    <img src="${song.thumbnail}" />
    <div>
      <h3>${song.title}</h3>
      <p>${song.category}</p>
    </div>
  `;
  div.onclick = () => playSong(index);
  return div;
}

function renderSongs() {
  songList.innerHTML = "";
  songs.forEach((song, i) => {
    if (song.title.toLowerCase().includes(search.value.toLowerCase())) {
      songList.appendChild(createCard(song, i));
    }
  });
}

search.oninput = renderSongs;

function playSong(index) {
  currentSongIndex = index;
  const song = songs[index];

  document.getElementById("mini-thumbnail").src = song.thumbnail;
  document.getElementById("mini-title").textContent = song.title;

  document.getElementById("full-thumbnail").src = song.thumbnail;
  document.getElementById("full-title").textContent = song.title;

  const audio = document.getElementById("audio");
  audio.src = song.audio_url.replace("watch?v=", "embed/");
  audio.play();

  mini.classList.remove('hidden');
  full.classList.remove('hidden');
}

document.getElementById("back-btn").onclick = () => {
  full.classList.add('hidden');
};

document.getElementById("play-pause-btn").onclick = () => {
  const audio = document.getElementById("audio");
  if (audio.paused) audio.play();
  else audio.pause();
};

document.getElementById("next-btn").onclick = () => {
  if (currentSongIndex + 1 < songs.length) playSong(currentSongIndex + 1);
};

document.getElementById("prev-btn").onclick = () => {
  if (currentSongIndex > 0) playSong(currentSongIndex - 1);
};

// Fetch from Firebase
db.ref("songs").once("value").then((snapshot) => {
  songs = Object.values(snapshot.val());
  renderSongs();
});
