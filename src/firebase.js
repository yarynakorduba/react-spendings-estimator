import firebase from "firebase/app"
import "firebase/database"

const config = {
  apiKey: "AIzaSyDaN-mBKIM2Sn2z5gHhe-GxTJgppUJaQAc",
  authDomain: "cost-app.firebaseapp.com",
  databaseURL: "https://cost-app.firebaseio.com",
  projectId: "cost-app",
  storageBucket: "cost-app.appspot.com",
  messagingSenderId: "973649762736"
}

const app = firebase.initializeApp(config)
export const base = app.database()
