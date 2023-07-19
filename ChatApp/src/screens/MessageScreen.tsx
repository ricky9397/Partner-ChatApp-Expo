import React from "react";
import { View } from 'react-native';
import { Header } from '../components/Header/Header';

export const MessageScreen:React.FC = () => {

    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title="채팅방"></Header.Title>
            </Header>
             
        </View>

    )
}
