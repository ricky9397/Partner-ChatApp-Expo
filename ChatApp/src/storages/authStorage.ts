import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthResult } from '../api/types';

const TOKEN_KEY = '@token_key';

// const authStorage = {
//   async get() {
//     const rawData = await AsyncStorage.getItem(key);
//     if (!rawData) {
//       return null;
//     }
//     try {
//       const data: AuthResult = JSON.parse(rawData);
//       return data;
//     } catch (e) {
//       return null;
//     }
//   },
//   set(authResult: AuthResult) {
//     return AsyncStorage.setItem(key, JSON.stringify(authResult));
//   },
//   clear() {
//     return AsyncStorage.removeItem(key);
//   },
// };

// export default authStorage;



export const authStorage = {
  setToken: async (data: Token) => {
    try {
      await AsyncStorage.setItem(
        TOKEN_KEY,
        JSON.stringify(data)
      )
    } catch (error) {
      console.log(error);
    }
  },
  getToken: async () => {
    try {
      const storageToken = await AsyncStorage.getItem(TOKEN_KEY);

      if(storageToken !== null){
        const token: Token  = JSON.parse(storageToken);
        return token;
      }

      return null;
    } catch (error) {
      console.log(error);
    }
  },
  clearToken: async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.log(error);
    }
  }
  
}

export interface Token{
  auth_token: string;
  refresh_token: string;
}