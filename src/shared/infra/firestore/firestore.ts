import { getFirestore } from 'firebase-admin/firestore';

import { firebaseApp } from '@firestore/firebase';

// ---------------------------------------------------------------------------------------------- //

const database = getFirestore(firebaseApp);

// ---------------------------------------------------------------------------------------------- //

export { database };
