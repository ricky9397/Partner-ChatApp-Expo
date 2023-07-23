export type RootStackParamList ={
    Auth: undefined; // 어플 첫 화면
    Kakao: undefined;
    AuthEmail: undefined; // 이메일 입력 화면
    AuthPhone: {
        userEmail: string;
    }; // 핸드폰 입력 화면
    AuthPassword: {
        userEmail: string;
    }; // 패스워드 입력 화면
    RootApp: undefined;

    Signup: undefined;
    Signin: undefined;
    Google: undefined; // 삭제해야함
    home: undefined;
}

export interface User {
    userId: string;
    email: string;
    name: string;
}
