import {initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc
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

//real time collection data
onSnapshot(colRef, (snapshot)=>{
  let books = []
  snapshot.forEach((doc) => {
    books.push({...doc.data(), id: doc.id})
  })
  console.log(books);
})

//not real time collection data
// getDocs(colRef)
//   .then((snapshot) => {
//     let books = []
//     snapshot.forEach((doc) => {
//       books.push({...doc.data(), id: doc.id})
//     })
//     console.log(books);
//   })
//   .catch((error) => {
//     console.log(error)
//   })



//adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e)=> {
  e.preventDefault()
    
  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value
  })
  .then(() => {
    addBookForm.reset()
  })
})

// deleting douments
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e)=> {
  e.preventDefault()
    
  const docRef = doc(db, 'books', deleteBookForm.id.value)
    
  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})