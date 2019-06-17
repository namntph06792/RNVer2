import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, Text, ActivityIndicator } from 'react-native';
import styles from '../style/styles';
import { firebaseApp } from '../components/FirebaseConfig';
import PostItem from '../components/PostItem';

export default function Admin() {

    const [data,setData] = useState([]);
    const [isLoading,toogleData] = useState(true);
 
    useEffect(() => {
        fetchFirebaseData();
    })

    fetchFirebaseData = () => {
        firebaseApp.database().ref('posts/').on('value', function (snapshot) {
            let array = [];
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                array.push({
                    id: childSnapshot.key,
                    title: childData.title,
                    content: childData.content,
                    like: childData.like,
                    comment: childData.comment
                });
            });
            setData(array);
            toogleData(false);
        });
    }
    
    if(isLoading === true){
        return(
            <View style={styles.listpost_container}>
                <ActivityIndicator size='small'/>
            </View>
        )
    }else{
        return(
            <View style={styles.listpost_container}>
                <View style={styles.listpost_btnGroup}>
                    <TouchableOpacity style={styles.listpost_btn}>
                        <Text>Posts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listpost_btn}>
                        <Text>Follows</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    style={{ flex: 1 }}
                    data={data}
                    renderItem={({ item }) => <PostItem dat={item} />}
                    keyExtractor={(item, index) => item.id}
                />
            </View>
        )
    }

    

}

