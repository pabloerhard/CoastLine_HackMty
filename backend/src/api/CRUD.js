import { db } from '../../config/firebase.js';
import { addDoc, collection, getDocs, getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default class CRUD {

    async create(collectionName, data) {
        const docRef = await addDoc(collection(db, collectionName), data);
        return docRef.id;
    }
    
    async getById(collectionName, id) {
        const docSnap = await getDoc(doc(collection(db, collectionName), id));
        if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
        } else {
        return null;
        }
    }
    
    async update(collectionName, id, data) {
        await updateDoc(doc(collection(db, collectionName), id), data);
    }
    
    async deleteById(collectionName, id) {
        await deleteDoc(doc(collection(db, collectionName), id));
    }
    
    async listByUserId(collectionName, userId) {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const list = [];
        querySnapshot.forEach((doc) => {
        if (doc.data().userId === userId) {
            list.push({ id: doc.id, ...doc.data() });
        }
        });
        return list;
    }
}