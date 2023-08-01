import React from "react";
import { View } from 'react-native';
import { Header } from '../../components/Header/Header';
import HomeImageSiderScreen from "./HomeImageSiderScreen";

export const HomeScreen:React.FC = () => {

    const userList = [
        {
          id: '1',
          imageUri: '../../../assets/favicon.png',
        },
        {
          id: '2',
          imageUri: '../../../assets/favicon.png',
        },
        {
          id: '3',
          imageUri: '../../../assets/favicon.png',
        },
    ];

    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title="HOME"></Header.Title>
            </Header>
            {/* <ImageSliderScreen /> */}
            <HomeImageSiderScreen/>
            {/* <ImageViewingScreent /> */}
        </View>
    )
}

