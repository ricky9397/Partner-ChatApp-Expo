import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import useLogin from '../../hooks/useLogin';
import { RootStackParamList } from '../types';

const AuthPasswordScreen = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'AuthPassword'>>();
    const userEmail = route.params?.userEmail;
    
    const [userPassword, setPassword] = useState('');

    const {mutate: login, isLoading: loginLoading} = useLogin();

    const isLoading = loginLoading;

    const onPress = () => {
        if(isLoading) {
            return;
        }

        login({
            userEmail,
            userPassword
        });
    }

    const onChangePasswordText = useCallback((text: string) => {
        setPassword(text);
    }, [userPassword]);

    const passwordErrorText = useMemo(() => {
        if (userPassword.length < 4) {
            return '비밀번호는 4자리 이상이여야합니다';
        }
    return null;
    }, [userPassword]);

    const signinButtonEnabled = useMemo(() => {
        return passwordErrorText == null;
      }, [passwordErrorText]);
    
      const signinButtonStyle = useMemo(() => {
        if (signinButtonEnabled) {
          return styles.signinButton;
        }
        return [styles.signinButton, styles.disabledSigninButton];
      }, [signinButtonEnabled]);

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={{fontSize:35,color:'#000', marginLeft: 20}}>비밀번호 입력</Text>
            </View>
            <View style={styles.content}>
                <TextInput 
                    value={userPassword}
                    style={styles.input}
                    secureTextEntry
                    onChangeText={onChangePasswordText}
                />
            </View>
            <View style={styles.footer}>
            <TouchableOpacity 
                style={signinButtonStyle}
                onPress={onPress}>
                <Text style={styles.buttonText}>
                    계속하기
                </Text>
            </TouchableOpacity>
            </View>
      </View>
    );
};

export default AuthPasswordScreen;

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
    buttonText: {
        fontSize: 15,
        color: 'rgb(0, 0, 0)',
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
    disabledSigninButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 20,
        backgroundColor: 'gray',
    },
    signinButton: {
        backgroundColor: '#FF9100',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 20,
    },
});