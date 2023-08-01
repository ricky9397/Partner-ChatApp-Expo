import React, { useCallback } from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import Swiper from 'react-native-swiper';

const images = [
    { 
        id: 1,
        imageUrl: 'https://picsum.photos/id/237/200/300',
    },
    { 
        id: 2,
        imageUrl: 'https://picsum.photos/seed/picsum/200/300',
    },
    { 
        id: 3,
        imageUrl: 'https://picsum.photos/200/300?grayscale',
    },
    { 
        id: 4,
        imageUrl: 'https://picsum.photos/200/300/?blur',
    },
  ];

const HomeImageSiderScreen = () => {

    const renderSwiper = useCallback(() => {

        const swiperComponents = [];

        for(const imageData of images) {
            const {id, imageUrl} = imageData;
            <TouchableOpacity key={id} style={styles.slide}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
                <Text>Id: {id}</Text>
            </TouchableOpacity>
        }

        return (
        <Swiper showsButtons={false} showsPagination={false} horizontal={true}>
            {swiperComponents}
        </Swiper>
        )
    }, []);
    
    return(
        <View style={styles.container}>
            {images.length > 0 ? renderSwiper() : <Text>이미지없음</Text>}
        </View>
    )
}

export default HomeImageSiderScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        width: '100%',
        height: '50%',
        resizeMode: 'cover',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
      },
});