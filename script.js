import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDYJFmTyC0bg88stR33nBlhaZPz5ENtoCE",
  authDomain: "uvi-web-app-8ec1e.firebaseapp.com",
  databaseURL: "https://uvi-web-app-8ec1e-default-rtdb.firebaseio.com",
  projectId: "uvi-web-app-8ec1e",
  storageBucket: "uvi-web-app-8ec1e.appspot.com",
  messagingSenderId: "90541572237",
  appId: "1:90541572237:web:6f59215375cab9e545a2c4"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const songRef = ref(db, 'songs');

const container = document.getElementById("song-container"); // set this in your HTML

onValue(songRef, (snapshot) => {
  container.innerHTML = "";
  snapshot.forEach((child) => {
    const song = child.val();
    const card = document.createElement("div");
    card.className = "song-card";
    card.innerHTML = `
      <img src="${song.thumbnail}" class="cover" />
      <div class="info">
        <h4>${song.title}</h4>
        <p>${song.category}</p>
      </div>
    `;
    card.addEventListener("click", () => {
      document.getElementById("main-audio").src = song.audio_url;
      document.getElementById("now-title").innerText = song.title;
      document.querySelector(".now-playing").style.display = "block";
      document.getElementById("main-audio").play();
    });
    container.appendChild(card);
  });
});
