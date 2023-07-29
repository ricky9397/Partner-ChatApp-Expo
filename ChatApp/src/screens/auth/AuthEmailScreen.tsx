import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useMemo, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import validator from 'validator';
import { getEmailCheck } from '../../api/auth';
import { RootStackParamList } from '../types';

interface Response {
    data : number;
    fail : boolean;
    msg : string;
    resultCode : number;
    success : boolean;
}

const AuthEmailScreen = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'AuthEmail'>>();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    
    const provider = route.params?.provider;

    const [userEmail, setEmail] = useState('');

    const emailErrorText = useMemo(() => {
        if (userEmail.length === 0) {
            return '이메일을 입력해주세요.';
          }
        if (!validator.isEmail(userEmail)) {
            return '올바른 이메일이 아닙니다.';
        }
        return null;
    }, [userEmail]);

    const onChangeEmailText = useCallback((text: string) => {
        setEmail(text);
    }, [userEmail]);

    const onPressEmailCheck = useCallback(async () => {
        const { data } :Response = await getEmailCheck({ userEmail: userEmail });
        if(data > 0 && provider === "email") {
            navigation.navigate("AuthPassword", {userEmail: userEmail});
            return;
        } 
        if(data === 0 && provider === "email" || provider === "kakao") {
            const id = route.params?.id;
            navigation.navigate('AuthPhone', { 
                id : id,
                userEmail : userEmail,
                provider : provider
            });
            return;
        }
    }, [userEmail]) ;

    const signinButtonEnabled = useMemo(() => {
        return emailErrorText == null;
    }, [emailErrorText]);
    
    const signinButtonStyle = useMemo(() => {
        if (signinButtonEnabled) {
          return styles.signinButton;
        }
        return [styles.signinButton, styles.disabledSigninButton];
    }, [signinButtonEnabled]);

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
                {emailErrorText && (
                    <Text style={styles.errorText}>{emailErrorText}</Text>
                )}
            </View>
            <View style={styles.footer}>
            <TouchableOpacity 
                style={signinButtonStyle}
                onPress={onPressEmailCheck}
                disabled={!signinButtonEnabled}>
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
    errorText: {
        fontSize: 15,
        color: 'red',
        marginTop: 4,
    },
});