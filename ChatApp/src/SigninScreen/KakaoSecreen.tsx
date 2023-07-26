import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { WebView } from "react-native-webview";
import { KAKAO_LOGIN_API_URI, } from '../api/client';
import { useNavigation } from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { RootStackParamList } from '../types';


// const REST_API_KEY = process.env.EXPO_PUBLIC_KAKAO_API_KEY;
interface response {
  id: number;
  userEmail: string;
  refresh_token: string;
  auth_token: string;
}

export default function KakaoScreen() {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    // const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;
  const INJECTED_JAVASCRIPT = ` (function() {
    document.getElementsByTagName('pre')[0].style.display="none";
    window.ReactNativeWebView.postMessage(document.getElementsByTagName('pre')[0].innerHTML);
    })();
    true;`;

  const loginAccess = async (data: string) => {
    try {
      const { id, userEmail, refresh_token, auth_token }: response = JSON.parse(data);
      
      console.log(id);
      console.log(userEmail);
      console.log(refresh_token);
      console.log(auth_token);

      if(userEmail === undefined || userEmail === null) {
        navigation.navigate('AuthEmail');
      } else {
        navigation.navigate('AuthPhone', { userEmail : userEmail });
      }

    } catch ( error ) {
        console.log(error);
    }
    
    // setMemberId(id);
    // setMemberNicknameState(nickname);
    // setMemberAvatar(avatar);
    // setProfile({ avatar: "", nickname, score: 0 });

    // if (accessToken) {
    //   toggleModal();
    //   await DeviceStorage.storeToken(accessToken);

    //   if (nickname === null) {
    //     navigation.navigate("JoinScreen");
    //     return;
    //   }
    //   await navigateByOrganizationList();
    // } else {
    //   console.log("not aceess token");
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
        onMessage={(event) => loginAccess(event.nativeEvent.data)}
      />
      </View>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
  },
});

