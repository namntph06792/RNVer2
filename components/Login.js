import React, { useState } from 'react';
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
import { Icon } from 'native-base';
import Camera from '../components/Camera';
import { firebaseApp } from '../components/FirebaseConfig';
import FlashMessage from "react-native-flash-message"; 

export default function Login(props) {

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSwitch, toggleSwitch] = useState(false);
    const [isPress, togglePress] = useState(true);
    const [isHidden, toggleHidden] = useState(false);

    loginToFirebase = () => {
        firebaseApp.auth().signInWithEmailAndPassword({email}, {password})
            .then(() => {
                this.refs.login.showMessage({
                    message: 'Success',
                    description: 'Login Successful, Welcome : ' + {email},
                    type: 'success',
                    onPress: () => userPermissions({email},{password})
                });
            })
            .catch(function (error) {

            });
    }

    userPermissions = (e, p) => {
        if (e == 'itachi1611@gmail.com' && p == '123456') {
            props.navigation.navigate("Admin");
        } else {
            props.navigation.navigate("Feed");
        }
    }

    validateLogin = () => {
        space = /^\s*$/;
        regE = /\w+@\w+(\.\w+){1,2}/;
        regP = /\w{5,}/;
        // const { email, password } = this.state;
        // if (space.test({email})) {
        //     this.refs.login.showMessage({
        //         message: 'Error',
        //         description: 'Email can not be empty !',
        //         type: 'warning',
        //     });
        // } else if (!regE.test({email})) {
        //     this.refs.login.showMessage({
        //         message: 'Error',
        //         description: 'Please fill the correct email format !',
        //         type: 'warning',
        //     });
        // } else if (space.test({password}) || !regP.test({password})) {
        //     this.refs.login.showMessage({
        //         message: 'Error',
        //         description: 'Password can not be empty and at least 5 characters !',
        //         type: 'warning',
        //     });
        // } else {
        //     loginToFirebase();
        // }
        // props.navigation.navigate("Admin");
        props.navigation.navigate("Feed");
    }

    showPassword = () => {
        if ({isPress} == false) {
            toggleHidden(false);
            togglePress(true);
        } else {
            toggleHidden(true);
            togglePress(false);
        }
    }

    switchVal = () => {
        toggleSwitch(!isSwitch);
        alert(!isSwitch);
    }


    return (
        
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <TouchableWithoutFeedback
                    style={styles.container}
                    onPress={Keyboard.dismiss}>

                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Image
                                style={styles.logo}
                                source={require("../assets/react-native-logo.png")}
                            />
                        </View>
                        <Camera nav={props.navigation} />
                        <FlashMessage ref={(input) => {this.login = input}} position='top' hideOnPress={true} autoHide={false} animated={true} />
                        <View style={styles.loginInfo}>
                            <View style={styles.loginInfoSection}>
                                <Image
                                    source={require("../assets/mail.png")}
                                    style={styles.inputImage}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email address"
                                    placeholderTextColor="rgba(255,255,255,0.8)"
                                    keyboardType="email-address"
                                    returnKeyType="next"
                                    autoCorrect={false}
                                    onSubmitEditing={() => this.password.focus()}
                                    onChangeText={(email) => setEmail(email)}
                                    value={email}
                                />
                            </View>
                            <View style={styles.loginInfoSection}>
                                <Image
                                    source={require("../assets/pass.png")}
                                    style={styles.inputImage}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    placeholderTextColor="rgba(255,255,255,0.8)"
                                    keyboardType="email-address"
                                    returnKeyType="go"
                                    secureTextEntry={isHidden}
                                    autoCorrect={false}
                                    ref={(input) => {this.password = input}}
                                    onChangeText={(password) => setPassword(password)}
                                    value={password}
                                />
                                <TouchableOpacity onPress={() => {showPassword()}} style={styles.btnEye} >
                                    <Icon active name={'eye'} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.loginInfoSection}>
                                <Switch
                                    onValueChange={() => switchVal()}
                                    value={isSwitch}
                                    style={{ transform: [{ scaleX: .5 }, { scaleY: .5 }], textAlign: 'left' }}
                                />
                                <Text>Remember me</Text>
                            </View>

                            <TouchableOpacity style={styles.btnLogin} onPress={() => validateLogin()}>
                                <Text style={styles.textButton}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.signup}>
                            <Text style={styles.text}>
                                Don't have an account ?
                                        <Text style={{ color: "blue" }} onPress={() => { props.navigation.navigate("Register") }}> Sign up </Text>
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

