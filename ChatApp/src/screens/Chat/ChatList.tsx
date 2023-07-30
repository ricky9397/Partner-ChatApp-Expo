import React from "react";
import { ScrollView, View } from 'react-native';
import MyProfile from "./MyProfile";


const ChatList = () => {

    return (
        <ScrollView>
            <View>
                <MyProfile />
            </View>
        </ScrollView>
    );
};

export default ChatList;