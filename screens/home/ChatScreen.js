import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React, {useState, useEffect, useContext, useCallback} from 'react';
import {auth, db } from '../../firebase/config';
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';
import {collection, addDoc, orderBy, query, onSnapshot, where } from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat';
const ChatScreen = ({navigation}) => {
    const { user, setUser } = useContext(AuthenticatedUserContext);
    const [messages, setMessages]=useState([]);
    React.useEffect(() => {

        const collectionRef = collection(db, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q,async snapshot => {
           
            await setMessages(
                snapshot.docs.map(doc => ({
                    _id: doc.id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                }))
            )
            console.log('messages',messages)
        }, error => {
                console.log(error)
            });

            

        return unsubscribe;
    }, [navigation]);


    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

        const { _id, createdAt, text, user} = messages[0];
        addDoc(collection(database, 'chats'), {
            _id,
            createdAt,
            text,
            user
        });
    }, []);
  return (
    <View>
        <Text>messages : {messages.length}</Text>
        <>
          {messages.map(message => (
            <Text key={message._id}>{message.text}</Text>
          ))}
        </>
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: user?.email,
            }}
            messagesContainerStyle={{
                backgroundColor: 'white'
            }}
            
        />
    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})