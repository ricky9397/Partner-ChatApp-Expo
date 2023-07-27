import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserContextProvider } from './src/contexts/UserContext';
import RootStack from './src/screens/RootStack';

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
