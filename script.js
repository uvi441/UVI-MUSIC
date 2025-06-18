// सॉन्ग्स डेटाबेस
const songs = [
  {
    id: "dQw4w9WgXcQ",
    title: "Never Gonna Give You Up",
    artist: "Rick Astley",
    image: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
  },
  {
    id: "JGwWNGJdvx8",
    title: "Shape of You",
    artist: "Ed Sheeran",
    image: "https://i.ytimg.com/vi/JGwWNGJdvx8/maxresdefault.jpg"
  }
];

let currentSong = 0;
let player;

// प्लेयर लोड करें
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '0',
    width: '0',
    events: {
      'onReady': onPlayerReady
    }
  });
}

// प्लेलिस्ट लोड करें
function loadPlaylist() {
  const list = document.getElementById('songList');
  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} - ${song.artist}`;
    li.onclick = () => playSong(index);
    list.appendChild(li);
  });
}

// गाना बजाएं
function playSong(index) {
  currentSong = index;
  const song = songs[index];
  
  document.getElementById('songTitle').textContent = song.title;
  document.getElementById('artist').textContent = song.artist;
  document.getElementById('albumImage').src = song.image;
  
  player.loadVideoById(song.id);
  document.getElementById('playBtn').textContent = '⏸️';
}

// प्ले/पॉज टॉगल
function togglePlay() {
  const btn = document.getElementById('playBtn');
  if (btn.textContent === '▶️') {
    player.playVideo();
    btn.textContent = '⏸️';
  } else {
    player.pauseVideo();
    btn.textContent = '▶️';
  }
}

// अगला गाना
function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  playSong(currentSong);
}

// पिछला गाना
function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  playSong(currentSong);
}

// पेज लोड होने पर
window.onload = function() {
  loadPlaylist();
  
  // YouTube API स्क्रिप्ट डायनामिकली लोड करें
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
};
