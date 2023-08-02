import React from "react";
import { View } from 'react-native';
import { Header } from '../../components/Header/Header';
import ImageSliderScreen from "./ImageSliderScreen";

export const HomeScreen = () => {

    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title="HOME"></Header.Title>
            </Header>
            <ImageSliderScreen/>
            {/* <ImageSlider /> */}
        </View>
    )
}

