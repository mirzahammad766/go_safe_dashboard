import {initializeApp} from "firebase/app"
import {getDatabase} from "firebase/database"
function StartFireBase(){
    const firebaseConfig={
        apiKey: "AIzaSyA7ltAVGYZY8ZlhOvikQyBCW-2g3zF4t60",
        authDomain: "gosafe-2ed5c.firebaseapp.com",
        databaseURL: "https://gosafe-2ed5c-default-rtdb.firebaseio.com",
        projectId: "gosafe-2ed5c",
        storageBucket: "gosafe-2ed5c.appspot.com",
        messagingSenderId: "518421601012",
        appId: "1:518421601012:web:30d8ffc5e3cc920b369ca1",
        measurementId: "G-PX7S1RYKTX"
    };
    const app= initializeApp(firebaseConfig);
    return getDatabase(app);
}

export default StartFireBase;
