import React, { useState } from 'react';
import { View, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, TextInput, Keyboard, Text, Alert } from 'react-native';
import styles from '../style/styles';
import { firebaseApp } from '../components/FirebaseConfig';
import FlashMessage from "react-native-flash-message"; 

export default function Post(props) {

    const [title,setTitle] = useState('');
    const [content, setContent] = useState('');
    const [like, setLike] = useState('');
    const [comment, setComment] = useState('');

    //DAO Functions with Firebase Data
    saveDataToFirebase = () => {
        firebaseApp.database().ref('posts/').push({
            title: title,
            content: content,
            like: like,
            comment: comment
        }, function (error) {
            if (error) {
                // The write failed...
                alert('Something wrong happened ! We can not save your data')
            } else {
                // Data saved successfully!
                Alert.alert(
                    'Information',
                    'Save data successful !',
                    // [
                    //     { 
                    //         text: 'OK', 
                    //         onPress: () => {
                    //             props.navigation.navigate('Admin') 
                    //         }
                    //     }
                    // ]
                );
                
            }
            resetState();
        });
        
    }

    //Validate data from input form
    validatePostRegister = () => {
        space = /^\s*$/;
        regP = /\d+/;
        if (space.test(title)) {
            post_register.showMessage({
                message: 'Error',
                description: 'Please input title !',
                type: 'warning',
            });
        } else if (space.test(content)) {
            post_register.showMessage({
                message: 'Error',
                description: 'Please input content !',
                type: 'warning',
            });
        } else if (space.test(like) || !regP.test(like)) {
            post_register.showMessage({
                message: 'Error',
                description: 'Please input like !',
                type: 'warning',
            });
        } else if (space.test(comment) || !regP.test(comment)) {
            post_register.showMessage({
                message: 'Error',
                description: 'Please input comment !',
                type: 'warning',
            });
        } else {
            saveDataToFirebase();
        }
    }

    //Common function
    resetState = () => {
        setTitle('');
        setContent('');
        setLike('');
        setComment('');
    }

    return (
        <View style={styles.post_container}>
            <KeyboardAvoidingView behavior="padding" style={styles.post_container}>
                <TouchableWithoutFeedback
                    style={styles.post_container}
                    onPress={Keyboard.dismiss}>
                    <View>
                        <FlashMessage ref={(input) => { this.post_register = input }} duration={1500} position='top' hideOnPress={true} autoHide={true} animated={true} />
                        <View style={styles.loginInfo}>
                            <TextInput
                                style={styles.input}
                                placeholder="Title"
                                placeholderTextColor="#d9e3f0"
                                keyboardType="default"
                                returnKeyType="next"
                                autoCorrect={false}
                                onSubmitEditing={() => this.content.focus()}
                                onChangeText={(title) => { setTitle(title) }}
                                value={title}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Content"
                                placeholderTextColor="#d9e3f0"
                                keyboardType="default"
                                returnKeyType="next"
                                autoCorrect={false}
                                ref={input => (this.content = input)}
                                onSubmitEditing={() => this.like.focus()}
                                onChangeText={(content) => { setContent(content) }}
                                value={content}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Like"
                                placeholderTextColor="#d9e3f0"
                                keyboardType="numbers-and-punctuation"
                                returnKeyType="next"
                                autoCorrect={false}
                                ref={input => (this.like = input)}
                                onSubmitEditing={() => this.comment.focus()}
                                onChangeText={(like) => { setLike(like) }}
                                value={like}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Comment"
                                placeholderTextColor="#d9e3f0"
                                keyboardType="numbers-and-punctuation"
                                returnKeyType="go"
                                autoCorrect={false}
                                ref={input => (this.comment = input)}
                                onChangeText={(comment) => { setComment(comment) }}
                                value={comment}
                            />
                            <TouchableOpacity style={styles.btnSubmit} onPress={() => validatePostRegister()}>
                                <Text style={styles.textButtonSubmit}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    );
}

