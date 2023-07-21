import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
// import MainTab from './MainTab';
// import ArticleScreen from './ArticleScreen';
import SigninScreen from '../SigninScreen/SigninScreen';
import SignupScreen from '../SignupScreen/SignupScreen';
// import MyArticlesScreen from './MyArticlesScreen';
import useAuthLoadEffect from '../hooks/useAuthLoadEffect';
import { RootApp } from '../RootApp';
import {useUserState} from '../contexts/UserContext';
// import WriteScreen from './WriteScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  useAuthLoadEffect();

  const [user] = useUserState();
  

  if(!!!user) {
    return (
      <Stack.Navigator screenOptions={{headerBackTitle: '닫기'}}>
        <Stack.Screen
          name="RootApp"
          component={RootApp}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    )
  }

  return (
    <Stack.Navigator screenOptions={{headerBackTitle: '닫기'}}>
      <Stack.Screen
        name="Signin"
        component={SigninScreen}
        options={{title: '짝꿍'}}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{title: '회원가입'}}
      />
      {/* <Stack.Screen
        name="ChatList"
        component={ChatList}
        options={{title: '메시지'}}
      /> */}
    </Stack.Navigator>
  );
}

export default RootStack;