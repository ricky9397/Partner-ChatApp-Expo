import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import validator from 'validator';
import { RootStackParamList } from '../types';

const AuthPhoneScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'AuthPhone'>>();
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const userEmail = route.params?.userEmail;
  const provider = route.params?.provider;

  const [userPhone, setUserPhone] = useState('');

  const onChangeUserPhoneText = useCallback((text: string) => {
    setUserPhone(text);
  }, [userPhone]);

  const phoneErrorText = useMemo(() => {
    if (userPhone.length === 0) {
      return '핸드폰번호를 입력해주세요.';
    }
    if (!validator.isMobilePhone(userPhone)) {
      return '올바른 핸드폰 번호가 아닙니다.';
    }
    return null;
  }, [userPhone]);

    const onPressPhoneButton = useCallback(() => {

    if(provider === "kakao") {
      navigate('KakaoSignup', {
        userEmail: userEmail,
        userPhone: userPhone,
      });
      return;
    }

    navigate('Signup', {
      userEmail: userEmail,
      userPhone: userPhone,
    });
  }, [userPhone]);

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={{fontSize:35,color:'#000', marginLeft: 20}}>휴대폰번호</Text>
            </View>
            <View style={styles.content}>
                <TextInput 
                  value={userPhone}
                    style={styles.input}
                    keyboardType="number-pad"
                  onChangeText={onChangeUserPhoneText}
                />
            </View>
            <View style={styles.footer}>
            <TouchableOpacity 
                style={styles.button}
                onPress={onPressPhoneButton}>
                <Text style={styles.buttonText}>  
                    계속하기
                </Text>
            </TouchableOpacity>
            </View>
      </View>
    );
};

export default AuthPhoneScreen;

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
});