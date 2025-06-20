// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDYJFmTyC0bg88stR33nBlhaZPz5ENtoCE",
  authDomain: "uvi-web-app-8ec1e.firebaseapp.com",
  databaseURL: "https://uvi-web-app-8ec1e-default-rtdb.firebaseio.com",
  projectId: "uvi-web-app-8ec1e",
  storageBucket: "uvi-web-app-8ec1e.appspot.com",
  messagingSenderId: "90541572237",
  appId: "1:90541572237:web:6f59215375cab9e545a2c4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Songs Fetcher
function loadSongsFromFirebase() {
  db.ref("songs").once("value", (snapshot) => {
    const songs = snapshot.val();
    if (songs) {
      Object.values(songs).forEach(song => {
        addSongToUI(song); // Tumhara UI card wala function
      });
    }
  });
}

window.addEventListener("load", loadSongsFromFirebase);
