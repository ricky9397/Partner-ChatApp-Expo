import React, {useCallback, useState, useMemo} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
} from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import useLogin from '../../hooks/useLogin';

const AuthPasswordScreen = () => {
    const route = useRoute<RouteProp<RootStackParamList>>();
    const userEmail = route.params?.userEmail;
    const [userPassword, setPassword] = useState('');

    const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const onPressPhoneButton = useCallback(() => {
        navigate('RootApp');
    }, [navigate]);

    const {mutate: login, isLoading: loginLoading} = useLogin();

    const isLoading = loginLoading;

    const onPress = () => {
        if(isLoading) {
            return;
        }
        login({
            userEmail,
            userPassword
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={{fontSize:35,color:'#000', marginLeft: 20}}>비밀번호 입력</Text>
            </View>
            <View style={styles.content}>
                <TextInput 
                    style={styles.input}
                />
            </View>
            <View style={styles.footer}>
            <TouchableOpacity 
                style={styles.button}
                onPress={onPressPhoneButton}>
                <Text style={styles.buttonText}>
                    계속하기
                </Text>
            </TouchableOpacity>
            </View>
      </View>
    );
};

export default AuthPasswordScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 10
    },
    title: {
      width:'100%',
      height:'18%',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    content: {
      width: '100%',
      height: '30%',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    footer: {
      width:'100%',
      height:'10%',
      marginBottom: 10,
      backgroundColor: 'white',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 20,
        backgroundColor: '#FF9100',
    },
        buttonText: {
        fontSize: 15,
        color: 'rgb(0, 0, 0)',
    },
    input: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: '30%',
        borderWidth: 2,
        paddingLeft: 20,
        borderRadius: 15,
        borderColor: '#dcdcdc',
        fontSize: 20,
        fontWeight: 'bold',
      },
});