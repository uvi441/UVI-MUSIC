const songs = [
  {
    title: "Jhoome Jo Pathaan",
    artist: "Arijit Singh",
    cover: "https://i.ytimg.com/vi/hHuG7FIKgtc/maxresdefault.jpg",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "Calm Down",
    artist: "Rema",
    cover: "https://i.ytimg.com/vi/JgDNFQ2RaLQ/maxresdefault.jpg",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    title: "Mockingbird",
    artist: "Eminem",
    cover: "https://i.ytimg.com/vi/YVkUvmDQ3HY/maxresdefault.jpg",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const playBtn = document.getElementById('playBtn');
const songList = document.getElementById('songList');
const searchInput = document.getElementById('searchInput');

let currentIndex = 0;

function renderSongs() {
  songList.innerHTML = "";
  songs.forEach((song, index) => {
    const card = document.createElement('div');
    card.className = 'song-card';
    card.innerHTML = `
      <img src="${song.cover}" />
      <h3>${song.title}</h3>
      <p>${song.artist}</p>
    `;
    card.onclick = () => loadSong(index);
    songList.appendChild(card);
  });
}

function filterSongs() {
  const query = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll('.song-card');
  songs.forEach((song, index) => {
    const match = song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query);
    cards[index].style.display = match ? 'block' : 'none';
  });
}

function loadSong(index) {
  const song = songs[index];
  currentIndex = index;
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
  audio.play();
  playBtn.textContent = '⏸';
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = '⏸';
  } else {
    audio.pause();
    playBtn.textContent = '▶️';
  }
}

function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
}

function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
}

audio.ontimeupdate = () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + '%';
};

function seek(e) {
  const bar = e.currentTarget;
  const percent = e.offsetX / bar.offsetWidth;
  audio.currentTime = percent * audio.duration;
}

function toggleTheme() {
  document.body.classList.toggle('light');
}

renderSongs();
loadSong(0);
