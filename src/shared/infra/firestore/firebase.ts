import { initializeApp, cert } from 'firebase-admin/app';

// ---------------------------------------------------------------------------------------------- //

const serviceAccount = {
  projectId: process.env.PROJECT_ID,
  clientEmail: process.env.CLIENT_EMAIL,
  privateKey: process.env.PRIVATE_KEY
};

const firebaseApp = initializeApp({ credential: cert(serviceAccount) });

// ---------------------------------------------------------------------------------------------- //

export { firebaseApp };
