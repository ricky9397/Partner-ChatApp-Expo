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

- yarn add expo-image-picker (expo용)
- yarn add react-native-image-crop-picker (이미지등록 라이브러리)

- https://github.com/meliorence/react-native-snap-carousel (이미지 슬라이더 snap 참고)
- yarn react-native-snap-carousel @types/react-native-snap-carousel

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


# 리액트네이티브 paper 디자인 참고자료
 - https://callstack.github.io/react-native-paper/docs/components/Searchbar

# 카프카 docker-compose.yml
 - KAFKA_BROKER_ID : broker.id 에 설정되는 정수값(식별자).
 - KAFKA_ZOOKEEPER_CONNECT: 브로커의 메타데이터를 주키퍼에 저장하기 위한 위치.
 - KAFKA_LISTENER_SECURITY_PROTOCOL_MAP : 구분하고 싶은 네트워크 추가와 보안 프로토콜을 지정. 보안 프로토콜은 PLAINTEXT, SSL, SASL 등 여러 가지가 있고 PLAINTEXT는 리스너가 암호화되지 않는 것.
 - KAFKA_INTER_BROKER_LISTENER_NAME : 브로커 간 통신에 사용할 리스너를 정의. KAFKA_ADVERTISED_LISTENERS 가 여러개인 경우 꼭 사용해야함
 - KAFKA_LISTENERS : 리스너 들의 목록이고, 호스트/ip 로 구성한다. 해당 옵션을 사용하지 않으면 모든 인터페이스에서 수신 할 수 있다. 기본값. 0.0.0.0
 - KAFKA_ADVERTISED_LISTENERS : kafka 브로커를 가리키는 사용 가능 주소로 초기연결시에 클라이언트에 전달되는 메타 데이터
 - KAFKA_DEFAULT_REPLICATION_FACTOR : 자동으로 생성되는 topic의 기본 복제 수
 - KAFKA_NUM_PARTITIONS : 토픽이 몇 개의 파티션으로 생성되는지. 기본 값은 1개이다. 토픽의 파티션 개수는 증가만 가능하고 감소될 수 없다.


