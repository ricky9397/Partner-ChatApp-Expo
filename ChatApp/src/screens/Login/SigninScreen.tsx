// import React, { useCallback, useContext, useMemo, useState } from 'react';
// import {
//   ActivityIndicator,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Button,
// } from 'react-native';
// import validator from 'validator';
// import Screen from '../components/Screen';
// import Colors from '../modules/Colors';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../screens/types';
// import useLogin from '../hooks/useLogin';
// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';
// // import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

// WebBrowser.maybeCompleteAuthSession();

// const SigninScreen = () => {
//   const [userEmail, setEmail] = useState('');
//   const [userPassword, setPassword] = useState('');
//   const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

//   const {mutate: login, isLoading: loginLoading} = useLogin();

//   const isLoading = loginLoading;

//   const onPress = () => {
//     if(isLoading) {
//       return;
//     }
//     login({
//       userEmail,
//       userPassword
//     });
//   }

//   const emailErrorText = useMemo(() => {
//     if (userEmail.length === 0) {
//       return '이메일을 입력해주세요.';
//     }
//     if (!validator.isEmail(userEmail)) {
//       return '올바른 이메일이 아닙니다.';
//     }
//     return null;
//   }, [userEmail]);

//   const passwordErrorText = useMemo(() => {
//     if (userPassword.length === 0) {
//       return '비밀번호를 입력해주세요.';
//     }
//     if (userPassword.length < 6) {
//       return '비밀번호는 6자리 이상이여야합니다';
//     }
//     return null;
//   }, [userPassword]);

//   const onChangeEmailText = useCallback((text: string) => {
//     setEmail(text);
//   }, []);

//   const onChangePasswordText = useCallback((text: string) => {
//     setPassword(text);
//   }, []);

//   const signinButtonEnabled = useMemo(() => {
//     return emailErrorText == null && passwordErrorText == null;
//   }, [emailErrorText, passwordErrorText]);

//   const signinButtonStyle = useMemo(() => {
//     if (signinButtonEnabled) {
//       return styles.signinButton;
//     }
//     return [styles.signinButton, styles.disabledSigninButton];
//   }, [signinButtonEnabled]);

//   const onPressGoogleButton = useCallback(() => {
//     navigate('Google');
//   }, [navigate]);

//   const [request, response, promptAsync] = Google.useAuthRequest({
//     expoClientId: 'google.apps.googleusercontent.com',
//     iosClientId: 'google.apps.googleusercontent.com',
//     androidClientId: 'google.apps.googleusercontent.com',
//     webClientId: 'google.apps.googleusercontent.com',
//   });

//   React.useEffect(() => {
//     if (response?.type === 'success') {
//       const { authentication } = response;
//       }
//   }, [response]);

//   return (
//     <Screen title="로그인">
//       <View style={styles.container}>
//         {processingSignin ? (
//           <View style={styles.signingContainer}>
//             <ActivityIndicator />
//           </View>
//         ) : (
//           <>
//             <View style={styles.section}>
//               <Text style={styles.title}>이메일</Text>
//               <TextInput
//                 value={userEmail}
//                 style={styles.input}
//                 onChangeText={onChangeEmailText}
//               />
//               {emailErrorText && (
//                 <Text style={styles.errorText}>{emailErrorText}</Text>
//               )}
//             </View>
//             <View style={styles.section}>
//               <Text style={styles.title}>비밀번호</Text>
//               <TextInput
//                 value={userPassword}
//                 style={styles.input}
//                 secureTextEntry
//                 onChangeText={onChangePasswordText}
//               />
//               {passwordErrorText && (
//                 <Text style={styles.errorText}>{passwordErrorText}</Text>
//               )}
//             </View>
//             <View>
//               <TouchableOpacity
//                 style={signinButtonStyle}
//                 onPress={onPress}
//                 disabled={!signinButtonEnabled}>
//                 <Text style={styles.signinButtonText}>로그인</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.signinTextButton}
//                 onPress={onPressGoogleButton}>
//                 <Text style={styles.signupButtonText}>
//                   구글스타뚜~
//                 </Text>
//               </TouchableOpacity>
//             </View>
//             <View>
//               <Button 
//               disabled={!request}
//               title="gogle"
//               onPress={() => {
//                 promptAsync();
//                 }}
//                 />
//             </View>
            
//           </>
//         )}
//       </View>
//     </Screen>
//   );
// };

// export default SigninScreen;


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   section: {
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: Colors.BLACK,
//   },
//   input: {
//     marginTop: 10,
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 10,
//     borderColor: Colors.GRAY,
//     fontSize: 16,
//   },
//   errorText: {
//     fontSize: 15,
//     color: Colors.RED,
//     marginTop: 4,
//   },
//   signinButton: {
//     backgroundColor: Colors.BLACK,
//     borderRadius: 10,
//     alignItems: 'center',
//     padding: 20,
//   },
//   signinButtonText: {
//     color: Colors.WHITE,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   disabledSigninButton: {
//     backgroundColor: Colors.GRAY,
//   },
//   signingContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   signinTextButton: {
//     marginTop: 5,
//     alignItems: 'center',
//     padding: 10,
//   },
//   signupButtonText: {
//     fontSize: 16,
//     color: Colors.BLACK,
//   },
// });