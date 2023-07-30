import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useMemo, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { TextInput } from "react-native-paper";
import Message from '../../components/Chat/Message';

const messages = [
    {
        name: '박한수',
        text: '박카스~~~~~~~~~~~~~~~~~',
        createdAt: '30:06',
        isOtherMessage : false
    },
    {
        name: '김명호',
        text: '손명오~~~~~~~~~~~~~~asdasdadsadsadsadsadsadsadasdsadsadsadsadsadsadsadsadsadsadsadsadsadsad~~', 
        createdAt: '30:06',
        isOtherMessage: true
    },
]

const ChatRoomScreen = () => {

    const [text, setText] = useState('');
    const sendDisabled = useMemo(() => text.length === 0, [text]);

    const onChangeText = useCallback((newText: string) => {
        setText(newText);
    }, [text]);

    return (
        <View style={styles.chatContainer}>
            <FlatList 
                inverted
                style={styles.messageList}
                data={messages}
                renderItem={({item: message}) => {
                    return (
                        <Message 
                            name={message.name}
                            text={message.text}
                            createdAt={message.createdAt}
                            isOtherMessage={message.isOtherMessage}
                        />
                    );
                }}            
            />
            <View style={styles.inputContainer}>
                <View style={styles.textInputContainer}>
                    <TextInput 
                        style={styles.textInput}
                        value={text}
                        onChangeText={onChangeText}
                        multiline
                        placeholder='새 메시지 입력'
                        placeholderTextColor={'#d3d9df'}
                    />
                </View>
                <TouchableOpacity 
                    style={sendDisabled ? disabledSendButtonStyle : styles.sendButton} 
                    disabled={sendDisabled}>
                    <Ionicons 
                        name={'send'}
                        color={'white'}
                        size={15}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChatRoomScreen;

const styles = StyleSheet.create({
    chatContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    messageList: {
        flex: 1,
        marginVertical: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInputContainer: {
        flex: 1,
        marginRight: 10,
        borderRadius: 17,
        borderColor: '#F6F6F6',
        // borderWidth: 1,
        overflow: 'hidden',
        // padding: 10,
        // minHeight: 50,
        justifyContent: 'center',
        height: 40,
    },
    textInput: {
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: '#F6F6F6',
    },
    sendButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#464646',
        width: 35,
        height: 35,
        borderRadius: 50 / 2,
    },
});

const disabledSendButtonStyle = [
    styles.sendButton,
    { backgroundColor: '#F6F6F6' },
];