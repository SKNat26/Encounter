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

  firebase.initializeApp(messageFirebaseConfig);

// FIREBASE for SUBMISSIONS
const submissionFirebaseConfig = {
  apiKey: "AIzaSyANXH7eZZNhd5WbArGpfnmipJJG1TrbxUE",
  authDomain: "animal-sightings-reports.firebaseapp.com",
  databaseURL: "https://animal-sightings-reports-default-rtdb.firebaseio.com",
  projectId: "animal-sightings-reports",
  storageBucket: "animal-sightings-reports.appspot.com",
  messagingSenderId: "1056172154951",
  appId: "1:1056172154951:web:7b46976a1ee7486d651162",
  measurementId: "G-ZTVH6HV2Z7"
};

  firebase.initializeApp(submissionFirebaseConfig);