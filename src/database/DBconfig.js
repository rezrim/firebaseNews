import * as firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZRGEvK8hR8lhCp8HFKbHcobe9KN6F-Ic",
    authDomain: "jojobaba-de481.firebaseapp.com",
    databaseURL: "https://jojobaba-de481.firebaseio.com",
    projectId: "jojobaba-de481",
    storageBucket: "jojobaba-de481.appspot.com",
    messagingSenderId: "293671249833",
    appId: "1:293671249833:web:0c3f10f2c52137915946b8",
    measurementId: "G-L679X697YH"
  };
  // Initialize Firebase

const app =  firebase.initializeApp(firebaseConfig);


export const db=app.database();

export const str=app.storage();