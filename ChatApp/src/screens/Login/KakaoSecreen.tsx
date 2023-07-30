import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from "react-native-webview";
import { KAKAO_LOGIN_API_URI, } from '../../api/client';
import kakaoLogin from '../../hooks/kakaoLogin';
// const REST_API_KEY = process.env.EXPO_PUBLIC_KAKAO_API_KEY;

export default function KakaoScreen() {
    // const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;
  const INJECTED_JAVASCRIPT = ` (function() {
    document.getElementsByTagName('pre')[0].style.display="none";
    window.ReactNativeWebView.postMessage(document.getElementsByTagName('pre')[0].innerHTML);
    })();
    true;`;

  const {mutate: login, isLoading: loginLoading} = kakaoLogin();
  
  const isLoading = loginLoading;

  const onPress = (data: string) => {
    if(isLoading) {
      return;
    }
    login(data);
  }

  return (
    <View style={styles.webContainer}>
      <WebView
        incognito={true}
        scalesPageToFit={true}
        javaScriptEnabled={true}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        source={{ uri: KAKAO_LOGIN_API_URI }}
        onMessage={(event) => onPress(event.nativeEvent.data)}
      />
      </View>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
  },
});

