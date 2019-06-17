import React, { useState, useEffect } from 'react';
import { View, TouchableHighlight, TextInput, TouchableOpacity } from 'react-native';
import { ListItem, Left, Thumbnail, Body, Text, Right, Button  } from "native-base";
import Modal from "react-native-modal";
import Swipeout from 'react-native-swipeout';
import styles from '../style/styles';
import { firebaseApp } from '../components/FirebaseConfig';
import FlashMessage from "react-native-flash-message"; 

export default function PostItem(props) {

    const [id, setId] = useState('');
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
    toggleModal = async() => {
        toggleHidden(!isHidden);
    }

    setDataToModal = () => {
        setId(props.dat.id);
        setTitle(props.dat.title);
        setContent(props.dat.content);
        setLike(props.dat.like);
        setComment(props.dat.comment);
        toggleModal();
    }

    resetState = () => {
        setId('');
        setTitle('');
        setContent('');
        setLike('');
        setComment('');
        toggleModal();
    }

    //Config for swipeout
    // const slideAnimation = new SlideAnimation({
    //     initialValue: 0, // optional
    //     slideFrom: 'bottom', // optional
    //     useNativeDriver: true, // optional
    // })

    let swipeButtonOptions = [
        // {
        //     text: 'Edit',
        //     backgroundColor: 'blue',
        //     underlayColor: '#8ED1FC',
        //     onPress: () => {
        //         setId(props.dat.id);
        //         setTitle(props.dat.title);
        //         setContent(props.dat.content);
        //         setLike(props.dat.like);
        //         setComment(props.dat.comment);
        //         togglePopup();
        //     },
        //     style: { height: 90 }
        // },
        {
            text: 'Delete',
            backgroundColor: 'red',
            underlayColor: '#8ED1FC',
            onPress: () => { this.deleteFirebaseData(props.dat.id) }
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
                buttonWidth={65}>
                <TouchableHighlight underlayColor='#8ED1FC'>
                    <ListItem thumbnail style={styles.post_item}>
                        <Left>
                            <Thumbnail square source={require('../assets/react-native.png')} style={{borderWidth: 1, borderColor: 'gray', borderRadius: 10}} />
                        </Left>
                        <Body>
                            <Text>{props.dat.title}</Text>
                            <Text>{props.dat.content}</Text>
                        </Body>
                        <Right>
                            <Button transparent onPress={this.setDataToModal}>
                                <Text>View</Text>
                            </Button>
                            
                        </Right>
                    </ListItem>
                </TouchableHighlight>
            </Swipeout>
            <Modal 
                isVisible={isHidden}
                //onBackdropPress = {this.toggleModal}
                onSwipeComplete = {this.toggleModal}
                swipeDirection = 'left'
                //animationIn = 'slideInUp'
                //animationInTiming = {500}
                //animationOut = 'slideInDown'
                //animationOutTiming = {500}
                avoidKeyboard = {true}
                backdropColor = 'black'
                
            >
                <View style={{ flex: 0.5, backgroundColor: 'white'}}>
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
                            ref={(input) => { this.content = input }}
                            onSubmitEditing={() => { this.like.focus() }}
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
                            ref={(input) => { this.like = input }}
                            onSubmitEditing={() => { this.comment.focus() }}
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
                            ref={(input) => { this.comment = input }}
                            onChangeText={(comment) => { setComment(comment) }}
                            value={comment}
                        />
                    </View>
                    <View style={styles.post_button}>
                        <TouchableOpacity onPress={this.toggleModal}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => validatePost()}>
                            <Text>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

