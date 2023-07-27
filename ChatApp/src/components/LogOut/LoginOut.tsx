import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { clearToken } from '../../api/client';
import { useUserState } from '../../contexts/UserContext';
import authStorage from '../../storages/authStorage';

const LoginOut = () => {

    const [, setUser] = useUserState();
 
    const onLogout = () => {
        setUser(null);
        clearToken();
        const res = authStorage.clear();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.logOutButton}
                onPress={onLogout}>
                <Text style={styles.buttonText}>
                    로그아웃
                </Text>
            </TouchableOpacity>
        </View>
    )
};

export default LoginOut;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logOutButton: {
        backgroundColor: '#FF9100',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 20,
        width: '90%',
        height: '8%',

    },
    buttonText: {
        fontSize: 15,
        color: 'rgb(0, 0, 0)',
    },
});