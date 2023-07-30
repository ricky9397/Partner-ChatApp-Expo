import moment from 'moment';
import React, { useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import Colors from '../../modules/Colors';


interface MessageProps {
    name: string;
    text: string;
    createdAt: string;
    // createdAt: Date;
    isOtherMessage: boolean;
}

const Message = ({
    name,
    text,
    createdAt,
    isOtherMessage,
} : MessageProps) => {

    const messageStyles = isOtherMessage ? otherMessageStyles : styles

    const renderMessageContainer = useCallback(() => {
        const components = [
            <Text key='timeText' style={messageStyles.timeText}>
                {moment(createdAt).format('HH:mm')}
            </Text>,
            <View key='message' style={messageStyles.bubble}>
                <Text style={messageStyles.messageText}>{text}</Text>
            </View>
        ]
        return isOtherMessage ? components.reverse() : components;
    }, [createdAt, text, messageStyles]);

    return (
        <View style={styles.root}>
            <TouchableOpacity 
            >
            {isOtherMessage && <Image source={require('../../../assets/poket.png')} style={styles.profile} />}
            </TouchableOpacity>
            <View style={messageStyles.container}>
                <Text style={styles.container}>{name}</Text>
                <View style={styles.messageConatiner}>
                    {renderMessageContainer()}
                </View>
            </View>
        </View>
    );
};

export default Message;


const styles = StyleSheet.create({
    root: {
      flexDirection: 'row',
    },
    container: {
      alignItems: 'flex-end',
      flex: 1,
    },
    nameText: {
      fontSize: 12,
      color: Colors.GRAY,
      marginBottom: 4,
    },
    messageConatiner: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    timeText: {
      fontSize: 12,
      color: Colors.GRAY,
    },
    bubble: {
      backgroundColor: '#FFE4E1',
      borderRadius: 12,
      padding: 12,
      flexShrink: 1,
    },
    messageText: {
      fontSize: 14,
      color: Colors.BLACK,
    },
    userPhoto: {
      marginRight: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    unreadCountText: {
      fontSize: 12,
      color: Colors.GRAY,
    },
    metaInfo: {
      marginRight: 4,
      alignItems: 'flex-end',
    },
    profile: {
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: Colors.GRAY,
        marginRight: 13,
    },
});

const otherMessageStyles = {
    container: [styles.container, { alignItems: 'flex-start' as const }],
    bubble: [styles.bubble, { backgroundColor: '#F6F6F6' }],
    messageText: [styles.messageText, { color: Colors.BLACK }],
    timeText: [styles.timeText],
    metaInfo: [
        styles.metaInfo,
        { alignItems: 'flex-start' as const, marginRight: 0, marginLeft: 4 },
    ],
};