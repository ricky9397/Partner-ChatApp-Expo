import React, { useCallback, useState } from 'react';
import {
    Pressable,
    Text, 
    Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AuthProfile = () => {

    const [image, setImage] = useState('');

    const onPressProfile = useCallback(async () => {
        
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
      
        console.log(result);
      
        if (!result.canceled) {
            return null;
        }
        

    }, []);

    return (
        <Pressable onPress={onPressProfile}>
            <Text>  
                계속하기
            </Text>
            <Image 
                source={{uri: image}}
            />
        </Pressable>
    );
};

export default AuthProfile;
