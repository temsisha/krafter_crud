import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

var firebaseConfig = {
  apiKey: 'AIzaSyBFrX7ZV39KO9EGR7YGS-pzasFLUU3VPNA',
  authDomain: 'krafter-react-crud.firebaseapp.com',
  databaseURL:
    'https://krafter-react-crud-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'krafter-react-crud',
  storageBucket: 'krafter-react-crud.appspot.com',
  messagingSenderId: '561390543678',
  appId: '1:561390543678:web:983d792342f611b139c26f',
}
// Initialize Firebase
var fireDb = firebase.initializeApp(firebaseConfig)

export default fireDb.database().ref()
