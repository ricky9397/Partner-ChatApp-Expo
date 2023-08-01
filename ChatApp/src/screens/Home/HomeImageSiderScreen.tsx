import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import ViewPager from "react-native-pager-view";
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';

interface ImageItem {
  id: number;
  imageUrl: string;
}

const images: ImageItem[] = [
  {
    id: 1,
    imageUrl: "https://picsum.photos/id/237/200/300",
  },
  {
    id: 2,
    imageUrl: "https://picsum.photos/seed/picsum/200/300",
  },
  {
    id: 3,
    imageUrl: "https://picsum.photos/200/300?grayscale",
  },
  {
    id: 4,
    imageUrl: "https://picsum.photos/200/300/?blur",
  },
];

const HomeImageSiderScreen = () => {

  const [likedImages, setLikedImages] = useState<number[]>([]);

  const handleLikePress = (id: number) => {
    if (likedImages.includes(id)) {
      setLikedImages(likedImages.filter(likedId => likedId !== id));
    } else {
      setLikedImages([...likedImages, id]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ViewPager style={styles.viewPager} initialPage={0}>
        {images.map((item) => (
          <View key={item.id}>
            <TouchableOpacity>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.heartCircleButton} onPress={() => console.log("Circle Button Pressed")}>
              <Ionicons
                // name={isLiked ? 'heart' : 'heart-outline'}
                // color={isLiked ? 'red' : 'black'}
                name="heart"
                size={35}
                color={'red'}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.xCircleButton} onPress={() => console.log("Circle Button Pressed")}>
              <Feather
                // name={isLiked ? 'heart' : 'heart-outline'}
                // color={isLiked ? 'red' : 'black'}
                name="x"
                size={35}
                color={'white'}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.starCircleButton} onPress={() => console.log("Circle Button Pressed")}>
              <AntDesign
                // name={isLiked ? 'heart' : 'heart-outline'}
                // color={isLiked ? 'red' : 'black'}
                name="star"
                size={35}
                color={'#46BEFF'}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.backCircleButton} onPress={() => console.log("Circle Button Pressed")}>
              <AntDesign
                // name={isLiked ? 'heart' : 'heart-outline'}
                // color={isLiked ? 'red' : 'black'}
                name="back"
                size={35}
                color={'#FFCD28'}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ViewPager>
    </View>
  );
};

export default HomeImageSiderScreen;

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: "cover",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  heartCircleButton: {
    position: 'absolute',
    bottom: '3%',
    right: '22%',
    backgroundColor: '#5a5a5a',
    borderRadius: 30,
    width: '27%',
    height: '8%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  xCircleButton: {
    position: 'absolute',
    bottom: '3%',
    left: '22%',
    backgroundColor: '#5a5a5a',
    borderRadius: 30,
    width: '27%',
    height: '8%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  starCircleButton: {
    position: 'absolute',
    bottom: '3%',
    right: '4%',
    backgroundColor: '#5a5a5a',
    borderRadius: 30,
    width: '15%',
    height: '8%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  backCircleButton: {
    position: 'absolute',
    bottom: '3%',
    left: '4%',
    backgroundColor: '#5a5a5a',
    borderRadius: 30,
    width: '15%',
    height: '8%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});
