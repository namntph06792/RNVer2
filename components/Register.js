import React, { useState } from 'react';
import { ScrollView, View, Image, Text, SafeAreaView, StatusBar, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import styles from '../style/styles';
import Camera from '../components/Camera';
import { Icon } from 'native-base';
import { firebaseApp } from '../components/FirebaseConfig';
import FlashMessage from "react-native-flash-message"; 

export default function Register(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [re_password, setRePassword] = useState('');
    const [isPress, togglePress] = useState(false);
    const [isHidden, toggleHidden] = useState(true);

    registerToFirebase = () => {
        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                register.showMessage({
                    message: 'Success',
                    description: 'Register Successful : ' + email,
                    type: 'success',
                    onPress: () => {
                        props.navigation.navigate("Login")
                    }
                });
                setEmail('');
                setPassword('');
            })
            .catch(function (error) {
               
            });
    }

    validateRegister = () => {
        space = /^\s*$/;
        regE = /\w+@\w+(\.\w+){1,2}/;
        regP = /\w{5,}/;
        if (space.test(email)) {
            register.showMessage({
                message: 'Error',
                description: 'Email can not be empty !',
                type: 'warning',
            });
        } else if (!regE.test(email)) {
            register.showMessage({
                message: 'Error',
                description: 'Please fill the correct email format !',
                type: 'warning',
            });
        } else if (space.test(password) || !regP.test(password)) {
            register.showMessage({
                message: 'Error',
                description: 'Password can not be empty and at least 5 characters !',
                type: 'warning',
            });
        } else if (re_password != password) {
            register.showMessage({
                message: 'Error',
                description: 'Password not match !',
                type: 'warning',
            });
        } else {
            registerToFirebase();
        }
    }

    showPassword = () => {
        if (isPress == false) {
            toggleHidden(false);
            togglePress(true);
        } else {
            toggleHidden(true);
            togglePress(false);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
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
                                <FlashMessage ref={(input) => {this.register = input}} position='top' hideOnPress={true} autoHide={false} animated={true} />
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
                                            keyboardType="default"
                                            returnKeyType="go"
                                            secureTextEntry={isHidden}
                                            autoCorrect={false}
                                            ref={input => (this.password = input)}
                                            onSubmitEditing={() => this.re_password.focus()}
                                            onChangeText={(password) => setPassword(password)}
                                            value={password}
                                        />
                                        <TouchableOpacity onPress={() => {showPassword()}} style={styles.btnEye} >
                                            <Icon active name={'eye'} />
                                        </TouchableOpacity>
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
                                            keyboardType="default"
                                            returnKeyType="go"
                                            secureTextEntry={isHidden}
                                            autoCorrect={false}
                                            ref={input => (this.re_password = input)}
                                            onChangeText={(re_password) => setRePassword(re_password)}
                                            value={re_password}
                                        />
                                        <TouchableOpacity onPress={() => {showPassword()}} style={styles.btnEye} >
                                            <Icon active name={'eye'} />
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity style={styles.btnRegister} onPress={() => {validateRegister() }}>
                                        <Text style={styles.textButton}>Sign Up</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.signin}>
                                    <Text style={styles.text}>
                                        Already have an account ?
                                    <Text style={{ color: "blue" }} onPress={() => { props.navigation.navigate("Login") }}> Login </Text>
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
}

