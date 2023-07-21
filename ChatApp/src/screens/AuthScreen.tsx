import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
import Colors from '../modules/Colors';

const AuthScreen = () => {
    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity>
                    <Text style={styles.signinButtonText}>로그인</Text>
                </TouchableOpacity>
            </View>    
        </View>
    );
};

export default AuthScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    signinButtonText: {
        color: Colors.BLACK,
        fontSize: 16,
        fontWeight: 'bold',
    },
});