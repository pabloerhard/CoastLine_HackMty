import { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../../config/firebase.js';

// Firestore CRUD operations

// 1. Add a Document to Firestore
export async function addUser(data) {
  try {
    const docRef = await addDoc(collection(db, "users"), data);
    return docRef.id;
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// 2. Get All Documents from a Collection
export async function getUsers() {
  const querySnapshot = await getDocs(collection(db, "users"));
  const users = [];
  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });
  return users;
}

// 3. Get a Single Document by ID
export async function getUser(docId) {
  const docRef = doc(db, "users", docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
}

// 4. Update a Document
export async function updateUser(docId, updatedData) {
  const docRef = doc(db, "users", docId);
  await updateDoc(docRef, updatedData);
  console.log("Document updated!");
}

// 5. Delete a Document
export async function deleteUser(docId) {
  const docRef = doc(db, "users", docId);
  await deleteDoc(docRef);
  console.log("Document deleted!");
}
