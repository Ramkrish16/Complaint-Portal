import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/firestore';
import { getAuth } from "firebase/auth";
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


var firebaseConfig = {
  apiKey: "AIzaSyBTYAPskRqbMQwGzk0UYCOZ4LZhkfrezcU",
  authDomain: "complaint-portal-151e3.firebaseapp.com",
  databaseURL: "https://complaint-portal-151e3-default-rtdb.firebaseio.com",
  projectId: "complaint-portal-151e3",
  storageBucket: "complaint-portal-151e3.appspot.com",
  messagingSenderId: "871180190343",
  appId: "1:871180190343:web:d0c52ec1e9d4018177ee22",
  measurementId: "G-7RS9W318XS"
};

// Initialize Firebase
var app=firebase.initializeApp(firebaseConfig);

var db= app.firestore();

export const storage = firebase.storage();

export var auth = getAuth(app);
export default app;
export { db };
