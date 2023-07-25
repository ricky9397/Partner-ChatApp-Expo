import axios from 'axios';

// __DEV__ 값을 통해 현재 환경이 개발 환경인지 아닌지 판단할 수 있습니다.
// const baseURL = 'http://10.220.102.229:8080';
const baseURL = 'http://192.168.144.1:8080';
// __DEV__
  // ? 'http://localhost:1337'
  // : 'https://articles.example.com';

const client = axios.create({
  headers: {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Headers' : 'Content-Type',
    'Content-Type' : 'application/json',
  },
  baseURL, 
});

export function applyToken(auth_token: string, refresh_token: string) {
  client.defaults.headers.auth_token = `Bearer ${auth_token}`;
  client.defaults.headers.refresh_token = `${refresh_token}`;
}

export function clearToken() {
  delete client.defaults.headers.auth_token;
  delete client.defaults.headers.refresh_token;
}

export default client;

export const KAKAO_LOGIN_API_URI = `${baseURL}/oauth2/authorization/kakao`;
export const KAKAO_REDIRECT_URI = `${baseURL}/login/oauth2/code/kakao`;
// export const KAKAO_REDIRECT_URI = `${baseURL}/oauth2/login/kakao`;



export async function kakaoLoginOrRegister(options: string) {
  const requestTokenUrl = 'https://kauth.kakao.com/oauth/token';

  console.log("options ==================== : ",options);

  const response = await axios.post(requestTokenUrl, options, {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  }).catch(function (error) {
        console.log('error', error);
  });

  console.log("response ==================== : ",response)
  
  return response;
}