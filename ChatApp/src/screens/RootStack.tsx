import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { RootStackParamList } from './types';
// import MainTab from './MainTab';
// import ArticleScreen from './ArticleScreen';
import SignupScreen from './register/SignupScreen';
// import MyArticlesScreen from './MyArticlesScreen';
import { RootApp } from '../RootApp';
import { useUserState } from '../contexts/UserContext';
import useAuthLoadEffect from '../hooks/useAuthLoadEffect';
// import WriteScreen from './WriteScreen';
import { useNavigation } from '@react-navigation/native';
import GoogleScreen from './Login/GoogleScreen';
import KakaoScreen from './Login/KakaoSecreen';
import KakaoSignup from './register/KakaoSignupScreen';
import AuthEmailScreen from './Auth/AuthEmailScreen';
import AuthPasswordScreen from './Auth/AuthPasswordScreen';
import AuthPhoneScreen from './Auth/AuthPhoneScreen';
import AuthProfile from './Auth/AuthProfileScreen';
import AuthScreen from './Auth/AuthScreen';
import ChatRoomScreen from './Chat/ChatRoomScreen';


const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {

  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const title = '짝꿍';
  useAuthLoadEffect();
  const [user] = useUserState();

  const onPress = () => {
    navigate("Auth");
  }

  return (
    <Stack.Navigator screenOptions={{headerBackTitle: '닫기'}}>
      {!!user ? (
        <>
        <Stack.Screen
          name="RootApp"
          component={RootApp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChatRoom"
          component={ChatRoomScreen}
          options={{
            title: "채팅"
          }}
        />
        </>
      ) : (
        <>
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{headerShown: false}}
        />
      <Stack.Screen
        name="Kakao"
        component={KakaoScreen}
        options={{title: 'Kakao'}}
      />
      <Stack.Screen
        name="AuthEmail"
        component={AuthEmailScreen}
        options={{
          title: title,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={onPress}>
              <Image
                    style={{backgroundColor: 'red', width: 30, height: 40}}
                    source={require('../../assets/logo.png')}/>
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen
        name="AuthPassword"
        component={AuthPasswordScreen}
        options={{title: title}}
      />
      <Stack.Screen
        name="AuthPhone"
        component={AuthPhoneScreen}
        options={{title: title}}
      />
      <Stack.Screen
        name="AuthProfile"
        component={AuthProfile}
        options={{title: title}}
      />
      <Stack.Screen
        name="KakaoSignup"
        component={KakaoSignup}
        options={{title: title}}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{title: '회원가입'}}
      />
      <Stack.Screen
        name="Google"
        component={GoogleScreen}
        options={{title: 'Google'}}
      />
      {/* <Stack.Screen
        name="ChatList"
        component={ChatList}
        options={{title: '메시지'}}
      /> */}
      </>
      )} 
    </Stack.Navigator>
  );
}

export default RootStack;