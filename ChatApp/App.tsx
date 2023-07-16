import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SignupScreen from './src/SignupScreen/SignupScreen';
import SigninScreen from './src/SigninScreen/SigninScreen';
import {QueryClient, QueryClientProvider} from 'react-query';
import RootStack from './src/screens/RootStack';
import {UserContextProvider} from './src/contexts/UserContext';

const queryClient = new QueryClient();

const Screens = () => {
  return (
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </QueryClientProvider>
    </UserContextProvider>

  )  
};

const App = () => {
  return <Screens />;
};

export default App;
