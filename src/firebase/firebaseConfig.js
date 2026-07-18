import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDtmVf-scvqH2syqOkqCxm161gM53vbhvc",
  authDomain: "forge-tech-7a44c.firebaseapp.com",
  projectId: "forge-tech-7a44c",
  storageBucket: "forge-tech-7a44c.firebasestorage.app",
  messagingSenderId: "254229374943",
  appId: "1:254229374943:web:5f16089ad039bdd454c66a",
  measurementId: "G-Y1Z7M29VVV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Exportar la instancia de Firestore para usar en componentes
export { db };