import React, { useState } from 'react';
import { Left, Body, Right, Card, CardItem, Thumbnail, Button, Icon, Text } from "native-base";
import { Image }from 'react-native';
import styles from '../style/styles';

export default function FContentItem(props) {

    const [publisher,setPublisher] = useState('React Native');
    const [author,setAuthor] = useState('itachi');

    return (
        <Card style={styles.user_item}>
            <CardItem>
                <Left>
                    <Thumbnail source={require('../assets/react-native.png')} />
                    <Body>
                        <Text>{publisher}</Text>
                        <Text note>{author}</Text>
                    </Body>
                </Left>
            </CardItem>
            <CardItem cardBody>
                <Image source={{ uri: 'https://www.innofied.com/wp-content/uploads/2018/12/2018-12-06.jpg' }} style={{ height: 200, width: null, flex: 1 }} />
            </CardItem>
            <CardItem cardBody>
                <Text>{props.dat.title}</Text>
            </CardItem>
            <CardItem cardBody>
                <Text note>{props.dat.content}</Text>
            </CardItem>
            <CardItem>
                <Left>
                    <Button transparent>
                        <Icon active name="heart" style={{color: '#ED4A6A'}}/>
                        <Text>{props.dat.like}</Text>
                    </Button>
                </Left>
                <Body>
                    <Button transparent>
                        <Icon active name="chatbubbles" />
                        <Text>{props.dat.comment} Comments</Text>
                    </Button>
                </Body>
                <Right>
                    <Text>11h ago</Text>
                </Right>
            </CardItem>
        </Card>
    );

}