import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { WebView } from "react-native-webview";
import { KAKAO_LOGIN_API_URI, KAKAO_REDIRECT_URI, kakaoLoginOrRegister } from '../api/client';
import * as Linking from 'expo-linking';

export default function KakaoScreen() {

    const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

    const getCode = (target: string) => {
      const exp = 'code=';
      const condition = target.indexOf(exp);
      if (condition !== -1) {
        const requestCode = target.substring(condition + exp.length);
        requestToken(requestCode);
      } 
    };

    const requestToken = async (requestCode: string,) => {
      const bodyData = {
        grant_type : 'authorization_code',
        client_id : process.env.EXPO_PUBLIC_KAKAO_API_KEY,
        client_secret : process.env.EXPO_PUBLIC_KAKAO_SECRET_KEY,
        redirect_uri : KAKAO_REDIRECT_URI,
        code : requestCode,
      };

      const queryStringBody = Object.keys(bodyData)
      Object.entries(bodyData).map( ([key,value]) => ( value && key+'='+value )).filter(v=>v).join('&');
        
      const result = kakaoLoginOrRegister(queryStringBody);

      console.log(result)

      // try {
      //   const result = kakaoLoginOrRegister(options);
      //   const ACCESS_TOKEN = tokenResponse.data.access_token;
    
      //   const body = {
      //     ACCESS_TOKEN,
      //   };
      //   const response = await axios.post(REDIRECT_URI, body);
      //   const value = response.data;
      //   const result = await storeUser(value);
      //   if (result === 'stored') {
      //     const user = await getData('user');
      //     dispatch(read_S(user));
      //     await navigation.navigate('Main');
      //   }
      // } catch (e) {
      //   console.log(e);
      // }
    };



    return (
      <View style={styles.webContainer}>
        <WebView
          incognito={true}
          scalesPageToFit={true}
          javaScriptEnabled={true}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          source={{ uri: KAKAO_LOGIN_API_URI }}
          onMessage={(event) => getCode(event.nativeEvent.url)}
        />
        </View>
    );
  }

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
  },
});

