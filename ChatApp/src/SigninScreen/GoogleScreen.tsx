import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from "react-native-webview";

export default function GoogleScreen() {
  const INJECTED_JAVASCRIPT = ` (function() {
    document.getElementsByTagName('pre')[0].style.display="none";
    window.ReactNativeWebView.postMessage(document.getElementsByTagName('pre')[0].innerHTML);
    })();
    true;`;

    return (
      <View style={styles.webContainer}>
      <WebView
        userAgent='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
          source={{ uri: 'http://localhost:8080/oauth2/authorization/google' }}
      />
      </View>
    );
  }

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
  },
});







