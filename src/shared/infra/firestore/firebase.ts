import { initializeApp, applicationDefault } from 'firebase-admin/app';

// ---------------------------------------------------------------------------------------------- //

// ? ---- These comments will remain here just in case a problem shows up in the deployment.

//// const { privateKey } = JSON.parse(process.env.PRIVATE_KEY as string);

//// const serviceAccount: ServiceAccount = {
////   projectId: process.env.PROJECT_ID,
////   clientEmail: process.env.CLIENT_EMAIL,
////   privateKey
//// };

//// const credential = process.env.NODE_ENV === 'production'
/////  ? cert(serviceAccount)
////   : applicationDefault();
//// const firebaseApp = initializeApp({ credential: applicationDefault() });
//// const firebaseApp = initializeApp({ credential });

const projectId = process.env.NODE_ENV === 'production'
  ? process.env.FIRESTORE_PROJECT_ID
  : 'dummy-project-id';

const firebaseApp = initializeApp({ credential: applicationDefault(),
  projectId });

// ---------------------------------------------------------------------------------------------- //

export { firebaseApp };
