import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDSU9gIHBwW35zt_tOhDBKXTe-lj-jC2pY",
  authDomain: "todoist-fc0f1.firebaseapp.com",
  databaseURL: "https://todoist-fc0f1.firebaseio.com",
  projectId: "todoist-fc0f1",
  storageBucket: "todoist-fc0f1.appspot.com",
  messagingSenderId: "1076914942487",
  appId: "1:1076914942487:web:f3eff6af61b5fce768e252"
});

export { firebaseConfig as firebase };
