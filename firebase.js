import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Copie os dados do seu painel Firebase:
const firebaseConfig = {
  apiKey: "AIzaSyCFk0MCgCC8fWQXthJZGgzoy8aot1mEy20",
  authDomain: "bloodmoon-167af.firebaseapp.com",
  projectId: "bloodmoon-167af",
  storageBucket: "bloodmoon-167af.firebasestorage.app",
  messagingSenderId: "735941285232",
  appId: "1:735941285232:web:27913773f42650bfa1ebb5",
  measurementId: "G-9W97RGD838"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const auth = getAuth(app);
export const db = getFirestore(app);