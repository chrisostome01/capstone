
// https://firebase.google.com/docs/web/setup#available-libraries

/* Database configuration */
const firebaseConfig = {
    apiKey: "AIzaSyDyhJPX5hGXmkVCjWiDYDgxW8Ongh0YZqU",
    authDomain: "capstone-d17ab.firebaseapp.com",
    projectId: "capstone-d17ab",
    storageBucket: "capstone-d17ab.appspot.com",
    messagingSenderId: "658315154433",
    appId: "1:658315154433:web:ee6855874b6ed722da1c00",
    databaseURL:"https://capstone-d17ab-default-rtdb.europe-west1.firebasedatabase.app"
};

/* Initialize Database  */
const app = firebase.initializeApp(firebaseConfig);
const database = app.database();
const auth = firebase.auth();
const userTable = database.ref('users');
const googleProvider = new firebase.auth.GoogleAuthProvider();

// loggin out
const logout = () => {   
    localStorage.clear();
    auth.signOut()
    .then(() => {
        console.log('Succefuly signed out');
    })
    .catch((error)=>{
        console.log(error);
    })
}

