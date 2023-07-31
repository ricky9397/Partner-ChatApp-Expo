import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { IconName } from '../components/Icons';
import { TabIcon } from '../components/TabIcon';
import { ChatScreen } from '../screens/Chat/ChatScreen';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { MyPageScreen } from '../screens/MyPageScreen';
export type  BottomTabParamList = {
    Home: undefined,
    Chat: undefined,
    MyPage: undefined
}
const BottomTab =createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigation = ()=>{
    return(
        <BottomTab.Navigator screenOptions={({route})=>{
            const getIconName = ():IconName =>{
                
                if(route.name === 'MyPage'){
                    return 'person'
                } 
                if(route.name === 'Chat'){
                    return 'chatbubble'
                } 
  
                return 'home';
            }

            const routeIconName = getIconName();

            return {
                headerShown:false,
                tabBarIcon:({color})=>{

                    return (
                        <TabIcon 
                            visibleBadge={false}
                            iconName={routeIconName} 
                            iconColor={color}/>
                    )
                }

            }
        }}>
            <BottomTab.Screen name='Home' component={HomeScreen} />
            <BottomTab.Screen name='Chat' component={ChatScreen} />
            <BottomTab.Screen name='MyPage' component={MyPageScreen}/>
        </BottomTab.Navigator>
    )
}