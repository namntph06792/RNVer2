import React, { useState } from 'react';
import { View, TouchableHighlight, KeyboardAvoidingView, TouchableWithoutFeedback, TextInput, Keyboard } from 'react-native';
import Dialog, { DialogFooter, DialogButton, SlideAnimation, DialogTitle, DialogContent } from 'react-native-popup-dialog';
import { ListItem, Left, Thumbnail, Body, Text, Right, Button  } from "native-base";
import Swipeout from 'react-native-swipeout';
import styles from '../style/styles';
import { firebaseApp } from '../components/FirebaseConfig';
import FlashMessage from "react-native-flash-message"; 

export default function PostItem(props) {

    const [id,setId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [like, setLike] = useState('');
    const [comment, setComment] = useState('');
    const [isHidden, toggleHidden] = useState(false);

    //DAO Functions with Firebase Data
    updateFirebaseData = () => {
        firebaseApp.database().ref('posts/' + id).set({
            title: title,
            content: content,
            like: like,
            comment: comment
        }, function (error) {
            if (error) {
                // The write failed...
                alert('Something wrong happened ! We can not update your data')
            } else {
                // Data saved successfully!
                alert('Update data successful !')
            }
        });
        resetState();
    }

    deleteFirebaseData = (id) => {
        firebaseApp.database().ref('posts/' + id).remove();
    }

    //Validate data from input form
    validatePost = () => {
        space = /^\s*$/;
        regP = /\d+/;
        if (space.test(title)) {
            post.showMessage({
                message: 'Error',
                description: 'Please input title !',
                type: 'warning',
            });
        } else if (space.test(content)) {
            post.showMessage({
                message: 'Error',
                description: 'Please input content !',
                type: 'warning',
            });
        } else if (space.test(like) || !regP.test(like)) {
            post.showMessage({
                message: 'Error',
                description: 'Please input like !',
                type: 'warning',
            });
        } else if (space.test(comment) || !regP.test(comment)) {
            post.showMessage({
                message: 'Error',
                description: 'Please input comment !',
                type: 'warning',
            });
        } else {
            updateFirebaseData();
        }
    }

    //Common function
    hidePopup = async() => {
        await toggleHidden(false);
    }

    resetState = () => {
        setId('');
        setTitle('');
        setContent('');
        setLike('');
        setComment('');
        toggleHidden(false);
    }

    //Config for swipeout
    const slideAnimation = new SlideAnimation({
        initialValue: 0, // optional
        slideFrom: 'bottom', // optional
        useNativeDriver: true, // optional
    })

    let swipeButtonOptions = [
        {
            text: 'Edit',
            backgroundColor: 'blue',
            underlayColor: '#8ED1FC',
            onPress: () => {
                setId(props.dat.id);
                setTitle(props.dat.title);
                setContent(props.dat.content);
                setLike(props.dat.like);
                setComment(props.dat.comment);
                () => toggleHidden(true);
            },
            style: { height: 90 }
        },
        {
            text: 'Delete',
            backgroundColor: 'red',
            underlayColor: '#8ED1FC',
            onPress: () => { deleteFirebaseData(props.dat.id) }
        }
    ]

    return (
        <View>
            <FlashMessage ref={(input) =>{ this.post = input}} position='top' hideOnPress={true} autoHide={false} animated={true} />
            <Swipeout
                right={swipeButtonOptions}
                autoClose={true}
                backgroundColor='transparent'
                sensitivity={80}
                buttonWidth={65}
            >
                <TouchableHighlight underlayColor='#8ED1FC'>
                    <ListItem thumbnail style={styles.post_item}>
                        <Left>
                            <Thumbnail square source={require('../assets/react-native.png')} />
                        </Left>
                        <Body>
                            <Text>{props.dat.title}</Text>
                            <Text note numberOfLines={1}>{props.dat.content}</Text>
                        </Body>
                        <Right>
                            <Button transparent>
                                <Text>View</Text>
                            </Button>
                        </Right>
                    </ListItem>
                </TouchableHighlight>
            </Swipeout>
            <Dialog
                height={300}
                visible={isHidden}
                //onTouchOutside={() => { this.hidePopup() }}
                dialogTitle={<DialogTitle title='Edit post' />}
                dialogAnimation={slideAnimation}
                // footer={
                //     <DialogFooter>
                //         <DialogButton
                //             text="CANCEL"
                //             bordered
                //             onPress={() => { this.hidePopup() }}
                //         />
                //         <DialogButton
                //             text="SAVE"
                //             bordered
                //             onPress={() => { this.validatePost() }}
                //         />
                //     </DialogFooter>
                // }
            >
                <DialogContent>
                    <KeyboardAvoidingView behavior="padding" style={styles.edit_post_container}>
                        <TouchableWithoutFeedback
                            style={styles.edit_post_container}
                            onPress={() => {Keyboard.dismiss}}>
                            <View style={styles.loginInfo}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Title"
                                    placeholderTextColor="#d9e3f0"
                                    keyboardType="default"
                                    returnKeyType="next"
                                    autoCorrect={false}
                                    onSubmitEditing={() => this.content.focus()}
                                    // onChangeText={({title}) => {this.setTitle({title})}}
                                    value={title}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Content"
                                    placeholderTextColor="#d9e3f0"
                                    keyboardType="default"
                                    returnKeyType="next"
                                    autoCorrect={false}
                                    ref={(input) => {this.content = input}}
                                    onSubmitEditing={() => {this.like.focus()}}
                                    // onChangeText={({content}) => {this.setContent({content})}}
                                    value={content}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Like"
                                    placeholderTextColor="#d9e3f0"
                                    keyboardType="numbers-and-punctuation"
                                    returnKeyType="next"
                                    autoCorrect={false}
                                    ref={(input) => {this.like = input}}
                                    onSubmitEditing={() => {this.comment.focus()}}
                                    // onChangeText={({like}) => {this.setLike({like})}}
                                    value={like}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Comment"
                                    placeholderTextColor="#d9e3f0"
                                    keyboardType="numbers-and-punctuation"
                                    returnKeyType="go"
                                    autoCorrect={false}
                                    ref={(input) => {this.comment = input}}
                                    // onChangeText={({comment}) => {this.setComment({comment})}}
                                    value={comment}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </DialogContent>
            </Dialog>
        </View>
    );
}

