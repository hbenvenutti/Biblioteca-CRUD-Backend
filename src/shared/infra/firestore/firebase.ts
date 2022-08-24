import { initializeApp, cert, applicationDefault, ServiceAccount } from 'firebase-admin/app';

// ---------------------------------------------------------------------------------------------- //

const serviceAccount: ServiceAccount = {
  projectId: process.env.PROJECT_ID,
  clientEmail: process.env.CLIENT_EMAIL,
  privateKey: process.env.PRIVATE_KEY
};

const credential = process.env.NODE_ENV === 'production'
  ? cert(serviceAccount)
  : applicationDefault();

const firebaseApp = initializeApp({ credential });

// ---------------------------------------------------------------------------------------------- //

export { firebaseApp };
