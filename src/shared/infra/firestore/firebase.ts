import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';

// ---------------------------------------------------------------------------------------------- //

const serviceAccount: ServiceAccount = {
  projectId: process.env.PROJECT_ID,
  clientEmail: process.env.CLIENT_EMAIL,
  privateKey: process.env.PRIVATE_KEY
};

const testServiceAccount = {
  projectId: process.env.TEST_PROJECT_ID,
  clientEmail: process.env.TEST_CLIENT_EMAIL,
  privateKey: process.env.TEST_PRIVATE_KEY
};

const credential = process.env.NODE_ENV === 'production'
  ? cert(serviceAccount)
  : cert(testServiceAccount);

const firebaseApp = initializeApp({ credential });

// ---------------------------------------------------------------------------------------------- //

export { firebaseApp };
