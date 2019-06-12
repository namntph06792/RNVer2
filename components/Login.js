import React, { } from 'react';
import styles from '../style/styles';
import { 
    View,
    Image,
    Text,
    SafeAreaView,
    StatusBar,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    Switch,
 } from 'react-native';
import { Container, Content, Form, Item, Icon } from 'native-base';
import Camera from '../components/Camera';

export default function Login(props) {

    var navigationOptions = {
        header: null,
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='light-content'/>
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <TouchableWithoutFeedback style={styles.container} onPress={() => Keyboard.dismiss()}>

                    <Container style={styles.container}>
                        
                        <Content>

                            <View style={styles.header}>
                                <Image source={require('../assets/react-native-logo.png')} style={styles.logo}/>
                            </View>
                            <Camera nav={props.navigation} />
                            <Form>
                                <Item>

                                </Item>
                                <Item>

                                </Item>
                                <Item last>

                                </Item>
                            </Form>
                        </Content>

                    </Container>

                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

