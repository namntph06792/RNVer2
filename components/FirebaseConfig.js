import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCRBLZLgrbWCkWVQoHPOZlGXn2_ez0zlJc",
    authDomain: "react-native-in1611.firebaseapp.com",
    databaseURL: "https://react-native-in1611.firebaseio.com",
    projectId: "react-native-in1611",
    storageBucket: "react-native-in1611.appspot.com",
    messagingSenderId: "349194105025",
    appId: "1:349194105025:web:477d15927c83779a"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);