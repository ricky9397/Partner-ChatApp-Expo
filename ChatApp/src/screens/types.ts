import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

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
  AuthPhone: undefined;
  AuthEmail: undefined;
  AuthPassword: {
    useEmail: string;
  };
  RootApp: undefined;

  MainTab: MainTabNavigationScreenParams;
  Article: {
    id: number;
  };
  Signup: undefined;
  Signin: undefined;
  MyArticles: undefined;
  Write: {
    articleId?: number;
  };

  Google: undefined;

};
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;