// firebaseConfig.ts
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDE4RHetCv5yuusX7OzuIuOFqOvzUxeznc",
  authDomain: "cronopoint-88a86.firebaseapp.com",
  projectId: "cronopoint-88a86",
  storageBucket: "cronopoint-88a86.firebasestorage.app",
  messagingSenderId: "131198767050",
  appId: "1:131198767050:web:7eefff8096e0e80aca8933",
  measurementId: "G-5KRB9HZ4JY"
}

// Inicializa o Firebase
const app = initializeApp(firebaseConfig)

// Exporta os serviços
export const db = getFirestore(app)
export const auth = getAuth(app)
