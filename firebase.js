import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Copie os dados do seu painel Firebase:
const firebaseConfig = {
  apiKey: "AIzaSyACkcJug2Sh-vfWSDwdXmE2pQFdjI_uJd0",
  authDomain: "lunar-3e272.firebaseapp.com",
  projectId: "lunar-3e272",
  storageBucket: "lunar-3e272.firebasestorage.app",
  messagingSenderId: "139886745568",
  appId: "1:139886745568:web:501d1f0884a8430241bd85",
  measurementId: "G-HYN204W0YH"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);