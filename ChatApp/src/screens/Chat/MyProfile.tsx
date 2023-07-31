import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../modules/Colors';
import { RootStackParamList } from '../types';
import { getChatList } from '../../api/chat';
import { useUserState } from '../../contexts/UserContext';
import { ChatResult } from '../../api/types';

const DATA = [
    {
        userName: '박한수',
        message: '박카스~~~~~~~~~~~~~~~~~'
    },
    {
        userName: '김명호',
        message: '손명오~~~~~~~~~~~~~~~~'
    },
    {
        userName: '김영웅',
        message: '내로남불~~~~~~~~~~~~~~~~~~'
    },
]


const data =
 [{"id": 2, "imagePath": "/img/bbb", "matchingId": 1, "regDate": [Array], "sendMessage": "안녕하세요", "userName": "김태희"}
 , {"id": 3, "imagePath": "/img/cccc", "matchingId": 2, "regDate": [Array], "sendMessage": "hi", "userName": "한소희"}];
 

const MyProfile = () => {
    const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [user] = useUserState();
    const [lodingChatLists, setLodingChatLists] = useState(false);
    const [chatLists, setChatLists] = useState<ChatResult[]>([]);

    const afterMatchingList = useCallback(async () => {
        const chatListParams = {
            id: user?.id,
            gender: user?.gender
        }
        try {
            if(!!chatListParams) {
                setLodingChatLists(true);
                const response: any = await getChatList(chatListParams);
                setChatLists(response);
            }
        }finally {
            setLodingChatLists(false);
        }
    }, []);

    useEffect(() => {
        afterMatchingList();
    }, [afterMatchingList]);

    return (
        <View style={styles.container}>
            <Text style={styles.topTextMsg}>메세지</Text>
            <View style={{ flexDirection: "row", marginBottom: '10%' }}>
            <FlatList 
                data={chatLists}
                renderItem={({ item: user }) => (
                    <TouchableOpacity 
                        style={styles.usersListItem}
                        onPress={() => {
                            navigate("ChatRoom", {
                                matchingId : user.matchingId
                            })
                        }}>
                        <Image source={require('../../../assets/favicon.png')} style={styles.profile} />
                        <View>
                            <Text style={styles.otherNameText}>{user.userName}</Text>
                            <Text style={styles.otherMessageText}>{user.sendMessage}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            </View>
        </View>
        
    );
};

export default MyProfile;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topTextMsg: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        color: Colors.GRAY
    },
    profile: {
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: Colors.GRAY,
        marginRight: 13,
    },
    usersListItem: {
        padding: 8,
        flexDirection: 'row',
    },
    otherNameText: {
        padding:3,
        fontSize: 15,
        fontWeight: 'bold', // 굵기 변경필요
        color: Colors.BLACK,
    },
    otherMessageText: {
        padding:3,
        color: Colors.GRAY // 색 변경필요
    },
});