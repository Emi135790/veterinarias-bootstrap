{/* <script type="module"> */}
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAHCbymXmVqJVk4IcRysBIcgkwR6i8S-Mk",
    authDomain: "veterinarias-d976a.firebaseapp.com",
    projectId: "veterinarias-d976a",
    storageBucket: "veterinarias-d976a.appspot.com",
    messagingSenderId: "255153342817",
    appId: "1:255153342817:web:036101e4c7af603e5f9d20",
    measurementId: "G-67SLFNGFTR"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
