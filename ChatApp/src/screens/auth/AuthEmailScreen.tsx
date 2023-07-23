import React, {useCallback, useState, useMemo} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import {useUserState} from '../../contexts/UserContext';

const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

const AuthEmailScreen = () => {
    const [userEmail, setEmail] = useState('');

    const [user] = useUserState();

    const onChangeEmailText = useCallback((text: string) => {
        setEmail(text);
    }, []);

    const onPressEmailButton = useCallback(() => {
        if(!!!user) {
            navigate('AuthPassword', {
                userEmail : userEmail,
            });
        } else {
            navigate('AuthPhone', {
                userEmail : userEmail,
            });
        }
      }, [navigate]);

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={{fontSize:35,color:'#000', marginLeft: 20}}>이메일주소</Text>
            </View>
            <View style={styles.content}>
                <TextInput 
                    value={userEmail}
                    style={styles.input}
                    onChangeText={onChangeEmailText}
                />
            </View>
            <View style={styles.footer}>
            <TouchableOpacity 
                style={styles.button}
                onPress={onPressEmailButton}>
                <Text style={styles.buttonText}>
                    계속하기
                </Text>
            </TouchableOpacity>
            </View>
      </View>
    );
};

export default AuthEmailScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 10
    },
    title: {
      width:'100%',
      height:'18%',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    content: {
      width: '100%',
      height: '30%',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    footer: {
      width:'100%',
      height:'10%',
      marginBottom: 10,
      backgroundColor: 'white',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 20,
        backgroundColor: '#FF9100',
    },
    buttonText: {
        fontSize: 15,
        titleColor: 'rgb(0, 0, 0)',
    },
    input: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: '30%',
        borderWidth: 2,
        paddingLeft: 20,
        borderRadius: 15,
        borderColor: '#dcdcdc',
        fontSize: 20,
        fontWeight: 'bold',
    },
});