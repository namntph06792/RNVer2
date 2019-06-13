import React, { } from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import styles from '../style/styles';

export default function Feed(props) {

    const {navigate} = props.nav

    return (
        <View style={styles.container_camera}>
            <TouchableHighlight style={styles.circle_image} underlayColor='#ccc' onPress={() => {navigate('Capture')}}>
                <Image source={require("../assets/camera.png")} />
            </TouchableHighlight>
        </View>
    );
}

