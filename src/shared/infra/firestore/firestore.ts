import { getFirestore } from 'firebase-admin/firestore';
import { firebaseApp } from './firebase';

const database = getFirestore(firebaseApp);

export { database };
