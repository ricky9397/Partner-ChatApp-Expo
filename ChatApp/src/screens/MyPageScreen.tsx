import React from "react";
import { View } from 'react-native';
import { Header } from '../components/Header/Header';
import LoginOut from "../components/LogOut/LoginOut";

export const MyPageScreen:React.FC = () => {
    

    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title="MY PAGE"></Header.Title>
            </Header>
            <LoginOut />
        </View>
    )
}
