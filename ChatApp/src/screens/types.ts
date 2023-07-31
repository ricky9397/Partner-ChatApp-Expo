import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

/* MainTab */
export type MainTabParamList = {
  Articles: undefined;
  UserMenu: undefined;
};
export type MainTabNavigationScreenParams =
  NavigatorScreenParams<MainTabParamList>;

export type MainTabNavigationProp = CompositeNavigationProp<
  RootStackNavigationProp,
  BottomTabNavigationProp<MainTabParamList>
>;
export type MainTabRouteProp = RouteProp<RootStackParamList, 'MainTab'>;

/* RootStack */
export type RootStackParamList = {
  Auth: undefined;
  Kakao: undefined;
  RootApp: undefined;
  AuthEmail: {
    id : number;
    provider : string;
  };
  AuthPhone: {
    id: number;
    userEmail: string | undefined;
    provider: string;
  }; // 핸드폰 입력 화면
  AuthPassword: {
      userEmail: string;
  }; // 패스워드 입력 화면

  Signup: {
    userEmail: string | undefined;
    userPhone: string;
  };

  KakaoSignup : {
    userEmail: string | undefined;
    userPhone: string;
    id: number;
  }

  AuthProfile : undefined;
  ChatRoom: {
    matchingId : number;
  };


  Google: undefined;

  MainTab: MainTabNavigationScreenParams;
  Article: {
    id: number;
  };
  
  MyArticles: undefined;
  Write: {
    articleId?: number;
  };

};
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;