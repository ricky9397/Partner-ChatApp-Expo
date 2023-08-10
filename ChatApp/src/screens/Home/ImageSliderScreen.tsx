import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
  Animated,
  Image,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { getImageList } from "../../api/image";
import { useUserState } from "../../contexts/UserContext";

interface ImageData {
  profileId: number;
  id: number;
  imageUrl1: string;
  imageUrl2: any;
  imageUrl3: any;
  imageUrl4: any;
  imageUrl5: any;
  imageUrl6: any;
}

interface ImageResult {
  profileId: number;
  imageId: number;
  imageName: string;
  imagePath: string;
}

const images: ImageData[] = [
  {
    profileId: 1,
    id: 1,
    imageUrl1: "https://picsum.photos/id/237/200/300",
    imageUrl2: "https://picsum.photos/seed/picsum/200/300",
    imageUrl3: null,
    imageUrl4: null,
    imageUrl5: null,
    imageUrl6: null,
  },
  {
    profileId: 2,
    id: 2,
    imageUrl1: "https://picsum.photos/seed/picsum/200/300",
    imageUrl2: "https://picsum.photos/id/237/200/300",
    imageUrl3: null,
    imageUrl4: null,
    imageUrl5: null,
    imageUrl6: null,
  },
  {
    profileId: 3,
    id: 3,
    imageUrl1: "https://picsum.photos/seed/picsum/200/300",
    imageUrl2: "https://picsum.photos/id/237/200/300",
    imageUrl3: null,
    imageUrl4: null,
    imageUrl5: null,
    imageUrl6: null,
  },
  {
    profileId: 4,
    id: 4,
    imageUrl1: "https://picsum.photos/seed/picsum/200/300",
    imageUrl2: "https://picsum.photos/id/237/200/300",
    imageUrl3: null,
    imageUrl4: null,
    imageUrl5: null,
    imageUrl6: null,
  },
];

export default function ImageSliderScreen() {
  const position = new Animated.ValueXY();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [moveImageUrl, setMoveImageUrl] = useState(0);
  const [imageLists, setImageLists] = useState<ImageResult[]>([]);
  const [user] = useUserState();

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      position.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx !== 0) {
        if (gestureState.dx > 50) {
          // Swipe right
          // if (currentIndex > 0) {
          // }
          if (images.length - 1 > currentIndex) {
            setCurrentIndex(currentIndex + 1);
            console.log("right");
          } else {
            console.log("주변찾기 로직")
          }


        } else if (gestureState.dx < -50) {
          // Swipe left
          // if (currentIndex < images.length - 1) {
          // }
          if (images.length - 1 > currentIndex) {
            setCurrentIndex(currentIndex + 1);
            console.log("left");
          }
        }
        position.setValue({ x: 0, y: 0 });
      } else if (gestureState.dx === 0) {
        if (gestureState.x0 > 210) {
          if (moveImageUrl < 5) {
            if (images[currentIndex].imageUrl2 !== null) {
              setMoveImageUrl(1);
            }
            if (images[currentIndex].imageUrl3 !== null) {
              setMoveImageUrl(2);
            }
            if (images[currentIndex].imageUrl4 !== null) {
              setMoveImageUrl(3);
            }
            if (images[currentIndex].imageUrl5 !== null) {
              setMoveImageUrl(4);
            }
            if (images[currentIndex].imageUrl6 !== null) {
              setMoveImageUrl(5);
            }
          }
        } else if (gestureState.x0 < 210) {
          if (moveImageUrl > -1) {
            if (images[currentIndex].imageUrl2 !== null) {
              setMoveImageUrl(0);
            }
            if (images[currentIndex].imageUrl3 !== null) {
              setMoveImageUrl(1);
            }
            if (images[currentIndex].imageUrl4 !== null) {
              setMoveImageUrl(2);
            }
            if (images[currentIndex].imageUrl5 !== null) {
              setMoveImageUrl(3);
            }
            if (images[currentIndex].imageUrl6 !== null) {
              setMoveImageUrl(4);
            }
          }
        }
      }
    },
  });

  const animatedStyle = {
    transform: position.getTranslateTransform(),
  };

  const imageList = useCallback(async () => {
    const imageListParams = {
      id: user?.id,
      gender: user?.gender,
    };

    const response = await getImageList(imageListParams);

    // console.log(response);
  }, []);

  useEffect(() => {
    imageList();
  }, [setImageLists]);

  const imageSwipe = () => {
    if (moveImageUrl === 0) {
      return (
        <Image
          source={{ uri: images[currentIndex].imageUrl1 }}
          style={styles.image}
        />
      );
    }
    if (moveImageUrl === 1) {
      return images[currentIndex].imageUrl2 !== null ? (
        <Image
          source={{ uri: images[currentIndex].imageUrl2 }}
          style={styles.image}
        />
      ) : (
        <Image
          source={{ uri: images[currentIndex].imageUrl1 }}
          style={styles.image}
        />
      );
    }
    if (moveImageUrl === 2) {
      return images[currentIndex].imageUrl3 !== null ? (
        <Image
          source={{ uri: images[currentIndex].imageUrl3 }}
          style={styles.image}
        />
      ) : (
        <Image
          source={{ uri: images[currentIndex].imageUrl2 }}
          style={styles.image}
        />
      );
    }
    if (moveImageUrl === 3) {
      return images[currentIndex].imageUrl4 !== null ? (
        <Image
          source={{ uri: images[currentIndex].imageUrl4 }}
          style={styles.image}
        />
      ) : (
        <Image
          source={{ uri: images[currentIndex].imageUrl3 }}
          style={styles.image}
        />
      );
    }
    if (moveImageUrl === 4 && images[currentIndex].imageUrl5 !== null) {
      return images[currentIndex].imageUrl5 !== null ? (
        <Image
          source={{ uri: images[currentIndex].imageUrl5 }}
          style={styles.image}
        />
      ) : (
        <Image
          source={{ uri: images[currentIndex].imageUrl4 }}
          style={styles.image}
        />
      );
    }
    if (moveImageUrl === 5 && images[currentIndex].imageUrl6 !== null) {
      return images[currentIndex].imageUrl6 !== null ? (
        <Image
          source={{ uri: images[currentIndex].imageUrl6 }}
          style={styles.image}
        />
      ) : (
        <Image
          source={{ uri: images[currentIndex].imageUrl5 }}
          style={styles.image}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.imageContainer, animatedStyle]}
      >
        {imageSwipe()}
      </Animated.View>
      {images.length - 1 > currentIndex ? (
        <Image
          source={{ uri: images[currentIndex + 1].imageUrl1 }}
          style={styles.backGroundImage}
        />
      ) : undefined}
      <TouchableOpacity
        style={styles.heartCircleButton}
        onPress={() => console.log("Circle Button Pressed")}
      >
        <Ionicons name="heart" size={35} color={"red"} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.xCircleButton}
        onPress={() => console.log("Circle Button Pressed")}
      >
        <Feather name="x" size={35} color={"white"} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.starCircleButton}
        onPress={() => console.log("Circle Button Pressed")}
      >
        <AntDesign name="star" size={35} color={"#46BEFF"} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backCircleButton}
        onPress={() => console.log("Circle Button Pressed")}
      >
        <AntDesign name="back" size={35} color={"#FFCD28"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    position: "absolute",
    width: "98%",
    height: "99%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 15,
    borderWidth: 1,
    zIndex: 1,
    borderColor: "#ccc",
  },
  backGroundImage: {
    width: "98%",
    height: "99%",
    resizeMode: "cover",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  heartCircleButton: {
    position: "absolute",
    bottom: "3%",
    right: "22%",
    backgroundColor: "#5a5a5a",
    borderRadius: 30,
    width: "27%",
    height: "8%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  xCircleButton: {
    position: "absolute",
    bottom: "3%",
    left: "22%",
    backgroundColor: "#5a5a5a",
    borderRadius: 30,
    width: "27%",
    height: "8%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  starCircleButton: {
    position: "absolute",
    bottom: "3%",
    right: "4%",
    backgroundColor: "#5a5a5a",
    borderRadius: 30,
    width: "15%",
    height: "8%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  backCircleButton: {
    position: "absolute",
    bottom: "3%",
    left: "4%",
    backgroundColor: "#5a5a5a",
    borderRadius: 30,
    width: "15%",
    height: "8%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
});
