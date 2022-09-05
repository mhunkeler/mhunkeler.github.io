
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBbPDr5Nni9jZShTbeGOwdPP4tDTvCOT3w",
    authDomain: "dina-723d7.firebaseapp.com",
    projectId: "dina-723d7",
    storageBucket: "dina-723d7.appspot.com",
    messagingSenderId: "422826683916",
    appId: "1:422826683916:web:86483c9446f14013b70829",
    measurementId: "G-535XCQ6R7Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

/**
 * Save a New Task in Firestore
 * @param {string} title the title of the Task
 * @param {string} description the description of the Task
 */
//export const saveTask = (title, description) =>  addDoc(collection(db, "configDina"), { title, description });

//export const onGetTasks = (callback) =>  onSnapshot(collection(db, "Dinamometrias"), callback);

/**
 *
 * @param {string} id Task ID
 */
//export const deleteTask = (id) => deleteDoc(doc(db, "configDina", id));

export const getTask = (IdDina) => getDoc(doc(db, "Dinamometrias", IdDina));

export const getX = (id) => getDoc(id);

//export const updateTask = (id, newFields) =>  updateDoc(doc(db, "configDina", id), newFields);

export const getTasks = () => getDocs(collection(db, "Dinamometrias"));