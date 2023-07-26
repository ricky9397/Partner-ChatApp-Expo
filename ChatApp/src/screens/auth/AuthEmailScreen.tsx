import React, {useCallback, useState, useMemo} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import {useUserState} from '../../contexts/UserContext';
import validator from 'validator';
import { getEmailCheck } from '../../api/auth';

interface Response {
    data : number;
    fail : boolean;
    msg : string;
    resultCode : number;
    success : boolean;
}

const AuthEmailScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    
    const [userEmail, setEmail] = useState('');
    const [user] = useUserState();

    const emailErrorText = useMemo(() => {
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
        if(data > 0) {
            navigation.navigate("AuthPassword", {userEmail: userEmail});
        } else {
            navigation.navigate('AuthPhone', { userEmail : userEmail });
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
});