import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import style from '../styles/style';
import firebase from 'firebase';

export default function Splash(props) {

    var navigationOptions = {
        header: null,
    }
    
    useEffect(() => checkIfLoggedIn());

    function checkIfLoggedIn(){
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                props.navigation.navigate('Feed');
            }else{
                props.navigation.navigate('Login');
            }
        }.bind(this))
    }

    return (
        <View style={styles.container}>
            <ActivityIndicator size='large'/>
        </View>
    );
}

