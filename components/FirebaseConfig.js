import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCRBLZLgrbWCkWVQoHPOZlGXn2_ez0zlJc",
    authDomain: "react-native-in1611.firebaseapp.com",
    databaseURL: "https://react-native-in1611.firebaseio.com",
    projectId: "react-native-in1611",
    storageBucket: "react-native-in1611.appspot.com",
    messagingSenderId: "349194105025",
    appId: "1:349194105025:web:8e5fb84bc7e79f03"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);