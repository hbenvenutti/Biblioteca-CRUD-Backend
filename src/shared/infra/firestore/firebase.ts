/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { initializeApp, applicationDefault, ServiceAccount, cert } from 'firebase-admin/app';

// ---------------------------------------------------------------------------------------------- //
let serviceAccount: ServiceAccount;

const projectId = process.env.NODE_ENV === 'production'
  ? process.env.FIRESTORE_PROJECT_ID
  : 'dummy-project-id';

if (process.env.NODE_ENV === 'production') {
  const { privateKey } = JSON.parse(process.env.FIRESTORE_PRIVATE_KEY as string);
  serviceAccount = { projectId, clientEmail: process.env.FIRESTORE_CLIENT_EMAIL, privateKey };
}

const firebaseApp = (process.env.NODE_ENV === 'production')
  ? initializeApp({ credential: cert(serviceAccount!) })
  : initializeApp({ credential: applicationDefault(), projectId });

// ---------------------------------------------------------------------------------------------- //

export { firebaseApp };
