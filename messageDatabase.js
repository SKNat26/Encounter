// FIREBASE for REGULAR MESSAGES
const messageFirebaseConfig = {
    apiKey: "AIzaSyANMgu9nkyYlhlB6-wJHy6JgBLD7YJINf4",
    authDomain: "animal-sightings-bce3d.firebaseapp.com",
    projectId: "animal-sightings-bce3d",
    storageBucket: "animal-sightings-bce3d.appspot.com",
    messagingSenderId: "919728645506",
    appId: "1:919728645506:web:35f9012930290ee440db9b",
    measurementId: "G-JCLVFE2N2D"
  };

let messages = firebase.initializeApp(messageFirebaseConfig, "messages");

const messageDatabase = firebase.database(messages).ref();