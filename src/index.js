import {initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where,
  orderBy, serverTimestamp,
  getDoc, updateDoc
} from 'firebase/firestore'
import { 
  getAuth,
  createUserWithEmailAndPassword
 } from 'firebase/auth'

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
const auth = getAuth()

//collection reference
const colRef = collection(db, 'books')

//queries
const q = query(colRef, orderBy('createdAt'))

//real time collection data
onSnapshot(q, (snapshot)=>{
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
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
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

//get a single document

const docRef = doc(db, 'books', 'DclGWQgjwc2eLP7vqrhE') 

onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
})

// update a single document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', updateForm.id.value)

  updateDoc(docRef, {
    title: 'updated title'
  })
  .then(() => {
    updateForm.reset()
  })

})

//singnig up users
const singUpForm = document.querySelector('.signup')
singUpForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = singUpForm.email.value
  const password = singUpForm.password.value

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log('user created', userCredential.user)
    singUpForm.reset()
  })
  .catch((error) => {
    console.log(error)
  })
})