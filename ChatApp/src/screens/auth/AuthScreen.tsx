import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { RootStackParamList } from '../types';

import * as AppleAuthentication from 'expo-apple-authentication';

const AuthScreen = () => {

  const onPress = async () => {
    alert("유료라 잠시 대기");
    // const {identityToken} = await AppleAuthentication.signInAsync({
    //   requestedScopes: [
    //     AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
    //     AppleAuthentication.AppleAuthenticationScope.EMAIL,
    //   ],
    // });

    // if(identityToken) {
    //   console.log("identityToken : ", identityToken)
    //   const user = await appleLoginOrRegister(identityToken);
    //   console.log(user);
    // }
  }

  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPressEmailButton = useCallback(() => {
    navigate('AuthEmail', {
      provider : 'email'
    });
  }, [navigate]);
  const onPressKakaoButton = useCallback(() => {
    navigate('Kakao');
  }, [navigate]);

  return (
      <View style={styles.container}>
          <View style={styles.header} />
          <View style={styles.title}>
          {/* <Text style={{fontSize:35,color:'#3c3c3c'}}>어서와,{'\n'}소개팅은 처음이지?</Text> */}
          </View>
          <View style={styles.content}>
          <Image
              style={{height:'100%',width:'100%',resizeMode:'contain'}}
              source={require('../../../assets/logo.png')}/>
          </View>
          <View style={styles.footer}>
          <TouchableOpacity 
              style={styles.button}
              onPress={onPressEmailButton}>
              <Text style={styles.buttonText}>
                  Email 로그인
              </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity 
            style={styles.button}
            onPress={onPressEmailButton}>
              <Text style={styles.buttonText}>
                  구글로그인
              </Text>
          </TouchableOpacity> */}
          <TouchableOpacity 
            style={styles.kakaoButton}
            onPress={onPressKakaoButton}>
              <Text style={styles.buttonText}>
                  카카오 로그인
              </Text>
          </TouchableOpacity>
          {Platform.OS === 'ios' ? (
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
              buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
              cornerRadius={20}
              style={styles.button}
              onPress={onPress}
            />
          ) : <></>}
          
          </View>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 10
    },
    header: {
      width:'100%',
      height:'5%',
      backgroundColor: 'white',
    },
    title: {
      width:'100%',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom:30,
      backgroundColor: 'white',
    },
    footer: {
      width:'100%',
      height:'15%',
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
        backgroundColor: '#dcdcdc',
    },
    kakaoButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 20,
        backgroundColor: '#FFE13C',
    },
        buttonText: {
        fontSize: 15,
        color: '#000000',
    },
});