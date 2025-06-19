const audio = document.getElementById("audio");
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");
const coverEl = document.getElementById("cover");
const playBtn = document.getElementById("playBtn");

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
  }
];

let currentIndex = 0;
let isPlaying = false;

function loadSong(index) {
  const song = songs[index];
  titleEl.textContent = song.title;
  artistEl.textContent = song.artist;
  coverEl.src = song.cover;
  audio.src = song.src;
  playBtn.textContent = "▶️";
  isPlaying = false;
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️";
    isPlaying = true;
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
    isPlaying = false;
  }
}

function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  if (isPlaying) audio.play();
}

function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  if (isPlaying) audio.play();
}

// Load first song
loadSong(currentIndex);
