# Partner-ChatApp-Expo


- yarn add @react-navigation/native 
- yarn add @react-navigation/native-stack react-native-screens react-native-safe-area-context
- yarn add @react-navigation/bottom-tabs
- yarn add react-native-vector-icons @types/react-native-vector-icons
- yarn add @react-native-async-storage/async-storage
- yarn add react-query axios @types/axios
- yarn add react-native-async-storage/async-storage
- yarn add validator
- yarn add @types/validator --dev
- yarn add styled-components

- npx expo install expo-apple-authentication (애플로그인)
- npm install @react-navigation/stack

# expo SDK4.9 버전업그레이드
- npm i -g eas-cli
- yarn add expo@^49.0.0
- npx expo install --fix


# redis 참고자료
https://hudi.blog/refresh-token-in-spring-boot-with-redis/

# 시큐리티 참고자료
https://lotuus.tistory.com/79


# portainer (docker 관리자 모드 설치)
 - docker volume create portainer_data
 - docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest
