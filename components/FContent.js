import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { Content } from 'native-base';
import { firebaseApp } from '../components/FirebaseConfig';
import FContentItem from '../components/FContentItem';

export default function FContent() {

    const [data,setData] = useState(null);
    const [isLoading,setLoading] = useState(true);

    useEffect(() => {
        readPostData();
    })

    readPostData = () => {
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
            setLoading(false);
            setData(array);
        });
    }

    if(isLoading){
        return <Content><ActivityIndicator/></Content>
    }
    return (
        <Content>
            <FlatList
                data={data}
                renderItem={({item}) => <FContentItem dat={item}/>}
                keyExtractor={(item,index) => item.id}
                />
        </Content>
    );

}