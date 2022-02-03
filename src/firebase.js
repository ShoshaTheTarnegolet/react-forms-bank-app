import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCSsO1q4QDe0zkaBVzdprI9NUR1LUXP4uo',
  authDomain: 'btbtest-assignment.firebaseapp.com',
  projectId: 'btbtest-assignment',
  storageBucket: 'btbtest-assignment.appspot.com',
  messagingSenderId: '792167109016',
  appId: '1:792167109016:web:7038a300ceb18180259bed',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
let storage = firebase.storage();

export { storage, db };
