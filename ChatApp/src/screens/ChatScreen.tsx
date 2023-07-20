import React from "react";
import { View } from 'react-native';
import { Header } from '../components/Header/Header';
import ChatList from '../ChatScreen/ChatList';
import { useUserState } from "../contexts/UserContext";

export const ChatScreen:React.FC = () => {

    const [user] = useUserState();

    console.log(user);

    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title="CHATTING"></Header.Title>
            </Header>
            <ChatList />
        </View>

    )
}
