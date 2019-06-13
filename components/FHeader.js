import React, { } from 'react';
import { Image } from 'react-native';
import { Header, Body, Button, Text, Segment } from 'native-base';
import styles from '../style/styles'; 

export default function FHeader() {

    return (
        <Header hasSegment>
            <Body>
                <Segment>
                    <Button first style={{width: 120,justifyContent: 'center',alignItems: 'center', padding: 10}}>
                        <Image source={require('../assets/post.png')} style={styles.image}/>
                        <Text>Share</Text>
                    </Button>
                    <Button last style={{ width: 120, justifyContent: 'center', alignItems: 'center', padding: 10}}>
                        <Image source={require('../assets/camera.png')} style={styles.image} />
                        <Text>Photo</Text>
                    </Button>
                </Segment>
            </Body>
        </Header>
    );
}

