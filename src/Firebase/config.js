
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyCBtjbr_4ZKE77HkuppwaH5hg9C6nSk_AQ",
    authDomain: "my-olx-clone-dc9b8.firebaseapp.com",
    projectId: "my-olx-clone-dc9b8",
    storageBucket: "my-olx-clone-dc9b8.appspot.com",
    messagingSenderId: "267022911348",
    appId: "1:267022911348:web:fb2efb09120333d0318e21",
    measurementId: "G-S3Q3PYWBZJ"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app)
