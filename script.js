const songList = document.getElementById('song-list');
const nowPlaying = document.getElementById('now-playing');
const nowPlayingTitle = document.getElementById('now-playing-title');
const nowPlayingArtist = document.getElementById('now-playing-artist');
const nowPlayingImage = document.getElementById('now-playing-image');
const nowPlayingAudio = document.getElementById('now-playing-audio');
const backButton = document.getElementById('back-button');
const likeBtn = document.getElementById('like-btn');
const filterTabs = document.querySelectorAll('.filter-tab');

let allSongs = [];
let likedSongs = JSON.parse(localStorage.getItem('likedSongs') || '[]');
let currentSong = null;

// Fetch songs from backend
fetch('https://uvi-music-1.onrender.com/songs')
  .then(res => res.json())
  .then(songs => {
    allSongs = songs;
    renderSongs(songs);
  });

// Render song cards
function renderSongs(songs) {
  songList.innerHTML = '';

  if (songs.length === 0) {
    songList.innerHTML = '<p class="text-center w-full text-gray-400">No songs found</p>';
    return;
  }

  songs.forEach(song => {
    const isLiked = likedSongs.includes(song.title);
    const songCard = document.createElement('div');
    songCard.className = 'bg-white dark:bg-gray-800 rounded-2xl shadow p-3 flex items-center gap-3 w-full cursor-pointer';
    songCard.innerHTML = `
      <img src="${song.image}" alt="${song.title}" class="w-14 h-14 rounded-xl object-cover" />
      <div class="flex-1">
        <h3 class="text-sm font-semibold">${song.title}</h3>
        <p class="text-xs text-gray-500 dark:text-gray-400">${song.artist}</p>
      </div>
      <button class="like-toggle text-xl ${isLiked ? 'text-pink-500' : 'text-gray-400'}">♥</button>
    `;

    // Play song on click
    songCard.addEventListener('click', (e) => {
      if (e.target.classList.contains('like-toggle')) return;
      playSong(song);
    });

    // Like button
    songCard.querySelector('.like-toggle').addEventListener('click', () => {
      toggleLike(song.title);
      renderSongs(getFilteredSongs());
    });

    songList.appendChild(songCard);
  });
}

// Play song in full player
function playSong(song) {
  currentSong = song;
  nowPlayingTitle.textContent = song.title;
  nowPlayingArtist.textContent = song.artist;
  nowPlayingImage.src = song.image;
  nowPlayingAudio.src = song.audio;
  nowPlayingAudio.play();
  nowPlaying.classList.remove('hidden');

  likeBtn.classList.toggle('text-pink-500', likedSongs.includes(song.title));
  likeBtn.classList.toggle('text-gray-400', !likedSongs.includes(song.title));
}

// Hide now playing
backButton.addEventListener('click', () => {
  nowPlaying.classList.add('hidden');
  nowPlayingAudio.pause();
});

// Like button in full player
likeBtn.addEventListener('click', () => {
  if (!currentSong) return;
  toggleLike(currentSong.title);
  likeBtn.classList.toggle('text-pink-500', likedSongs.includes(currentSong.title));
  likeBtn.classList.toggle('text-gray-400', !likedSongs.includes(currentSong.title));
  renderSongs(getFilteredSongs());
});

// Toggle like
function toggleLike(title) {
  if (likedSongs.includes(title)) {
    likedSongs = likedSongs.filter(t => t !== title);
  } else {
    likedSongs.push(title);
  }
  localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
}

// Filter tabs (All / Liked)
filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelector('.filter-tab.active').classList.remove('active');
    tab.classList.add('active');
    renderSongs(getFilteredSongs());
  });
});

function getFilteredSongs() {
  const activeTab = document.querySelector('.filter-tab.active');
  return activeTab.id === 'tab-liked' ? allSongs.filter(song => likedSongs.includes(song.title)) : allSongs;
}
