import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import ViewPager from "react-native-pager-view";

interface ImageData {
  id: number;
  imageUrl: string;
}

const images: ImageData[] = [
  { id: 1, imageUrl: "https://picsum.photos/id/237/200/300" }, // 각 이미지의 실제 URL을 사용해주세요
  { id: 2, imageUrl: "https://picsum.photos/seed/picsum/200/300" },
  { id: 3, imageUrl: "https://picsum.photos/seed/picsum/200/300" },
  { id: 4, imageUrl: "https://picsum.photos/seed/picsum/200/300" },
  { id: 5, imageUrl: "https://picsum.photos/seed/picsum/200/300" },
  { id: 6, imageUrl: "https://picsum.photos/seed/picsum/200/300" },
  // ... 다른 이미지 데이터들
];

export default function ImageSliderScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
  };

  const handlePreviousImage = () => {
    const previousIndex =
      currentIndex === 0 ? images.length - 1 : currentIndex - 1;

    setCurrentIndex(previousIndex);
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.imageContainer}>
        <Image
          source={{ uri: images[currentIndex].imageUrl }}
          style={styles.image}
          resizeMode="cover" // 이미지가 100% 채우도록 설정
        />
      </View> */}
      <ViewPager style={styles.imageContainer} initialPage={0} onPageSelected={(e) => console.log(e)}>
        {images.map((image) => (
          <View key={image.id} style={styles.imageContainer}>
            <Image
              source={{ uri: image.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        ))}
      </ViewPager>
      <View style={styles.touchAreaContainer}>
        <TouchableOpacity
          style={styles.touchPrevArea}
          onPress={handlePreviousImage}
        ></TouchableOpacity>
        <TouchableOpacity
          style={styles.touchNextArea}
          onPress={handleNextImage}
        ></TouchableOpacity>
      </View>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  touchAreaContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
  },
  touchPrevArea: {
    width: "50%",
    height: "100%",
  },
  touchNextArea: {
    width: "50%",
    height: "100%",
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
