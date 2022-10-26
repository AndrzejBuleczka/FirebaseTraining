import {initializeApp } from 'firebase/app'
import {
  getFirestore, collection, getDocs
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCgwYIsOD5adBvIDsLd5Qq4CYDK1R1X2es",
  authDomain: "fir-9-schola.firebaseapp.com",
  projectId: "fir-9-schola",
  storageBucket: "fir-9-schola.appspot.com",
  messagingSenderId: "474268649630",
  appId: "1:474268649630:web:e442cb5bfb333b96e1138f"
};

//init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

//collection reference
const colRef = collection(db, 'books')

//get the collection data
getDocs(colRef)
  .then((snapshot) => {
    let books = []
    snapshot.forEach((doc) => {
      books.push({...doc.data(), id: doc.id})
    })
    console.log(books);
  })
  .catch((error) => {
    console.log(error)
  })