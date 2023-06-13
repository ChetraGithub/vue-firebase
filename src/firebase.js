// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from 'firebase'
import { ref, onUnmounted } from 'vue'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAP_4MEEmVSR20QeFoMTHrnMxtp3C0KoJ0",
  authDomain: "vue-firebase-f1df3.firebaseapp.com",
  projectId: "vue-firebase-f1df3",
  storageBucket: "vue-firebase-f1df3.appspot.com",
  messagingSenderId: "713790613554",
  appId: "1:713790613554:web:bd1203b8672be063f2f42b",
  measurementId: "G-0VL6P7ZKRE"
};

// Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
const firebaseApp = firebase.initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);

const db = firebaseApp.firestore()
const usersCollection = db.collection('users')

export const createUser = user => {
  return usersCollection.add(user)
}

export const getUser = async id => {
  const user = await usersCollection.doc(id).get()
  return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user)
}

export const deleteUser = id => {
  return usersCollection.doc(id).delete()
}

export const useLoadUsers = () => {
  const users = ref([])
  const close = usersCollection.onSnapshot(snapshot => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return users
}