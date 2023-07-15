import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SignupScreen from './src/SignupScreen/SignupScreen';
import SigninScreen from './src/SigninScreen/SigninScreen';
import { RootStackParamList } from './src/types';
import {QueryClient, QueryClientProvider} from 'react-query';
import RootStack from './src/screens/RootStack';
import {UserContextProvider} from './src/contexts/UserContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootApp } from './src/RootApp';

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

const Screens = () => {
  return (
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Signup' component={SignupScreen} />
            <Stack.Screen name='Signin' component={SigninScreen} />
          </Stack.Navigator> */}
          <RootStack />
        </NavigationContainer>
      </QueryClientProvider>
    </UserContextProvider>

  )  
};

const App = () => {
  return <Screens />;
  // return (
  //   <SafeAreaProvider>
  //     <RootApp />
  //   </SafeAreaProvider>
  // );
};

export default App;
