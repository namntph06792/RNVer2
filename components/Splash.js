import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from '../style/styles';
import { StackActions, NavigationActions } from 'react-navigation';

export default function Splash(props) {

    var navigationOptions = {
        header: null,
    }

    const resetAction = StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({routeName: 'Login'})
        ]
    });

    useEffect(() => {
        setTimeout(
            () => {
                props.navigation.dispatch(resetAction)
            },
            2 * 1000
        );
    });

    return (
        <View style={styles.container}>
            <ActivityIndicator size='large'/>
        </View>
    );
}

