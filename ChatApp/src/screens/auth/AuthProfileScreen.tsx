import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import FormData from "form-data";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { profileImageSave } from "../../api/image";

export default function AuthProfileScreen() {
  const [images, setImages] = useState<string[]>([]);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        ...FontAwesome.font,
      });
      setFontLoaded(true);
    }

    loadFont();
  }, []);

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (images.length < 6) {
        setImages([...images, result.assets[0].uri]);
      } else {
        // 이미지 등록 가능 개수를 초과한 경우 처리
        alert("이미지 등록은 최대 6개까지 가능합니다.");
      }
    }
  }, [images]);

  const deleteImage = useCallback(
    (index: number) => {
      const updatedImages = images.filter((_, i) => i !== index);
      setImages(updatedImages);
    },
    [images]
  );

  const imageErrorText = useMemo(() => {
    if (images.length === 0) {
      return "이미지는 한장 이상 등록 해주세요.";
    }
    return null;
  }, [images]);

  const nextButtonEnabled = useMemo(() => {
    return imageErrorText == null;
  }, [imageErrorText]);

  const nextButtonStyle = useMemo(() => {
    if (nextButtonEnabled) {
      return styles.nextButton;
    }
    return [styles.nextButton, styles.disabledNextButton];
  }, [nextButtonEnabled]);

  const onPressProfileButton = useCallback(async () => {
    const formData = new FormData();

    images.forEach((uri) => {
      formData.append("files", {
        uri,
        type: `image/${uri.split(".").pop()}`,
        name: uri.split("/").pop(),
      });
    });
    profileImageSave(formData);

  }, []);

  return (
    <LinearGradient colors={["#FFA07A", "#FFE5CB"]} style={styles.container}>
      <View style={styles.imageContainer}>
        {images.map((uri, index) => (
          <View key={index}>
            <Image source={{ uri }} style={styles.image} />
            {fontLoaded && (
              <Pressable
                style={styles.deleteButton}
                onPress={() => deleteImage(index)}
              >
                <FontAwesome name="trash" size={24} color="#FFDBC1" />
              </Pressable>
            )}
          </View>
        ))}
        {Array.from({ length: 6 - images.length }, (_, index) => (
          <Pressable
            key={index}
            style={styles.addImagePlaceholder}
            onPress={pickImage}
          >
            {({ pressed }) => (
              <>
                <Text style={styles.addImageText}>+</Text>
              </>
            )}
          </Pressable>
        ))}
      </View>
      <View>
        {imageErrorText && (
          <Text style={{ color: "white" }}>{imageErrorText}</Text>
        )}
      </View>
      <TouchableOpacity
        style={nextButtonStyle}
        onPress={onPressProfileButton}
        disabled={!nextButtonEnabled}
      >
        <Text style={styles.buttonText}>등록하기</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 10,
  },
  deleteButton: {
    position: "absolute",
    bottom: 0,
    left: "45%",
  },
  addImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  addImageText: {
    fontSize: 40,
    color: "white",
  },
  buttonText: {
    fontSize: 15,
    color: "white",
  },
  disabledNextButton: {
    width: "84%",
    height: "7%",
    marginTop: "10%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    backgroundColor: "gray",
  },
  nextButton: {
    backgroundColor: "#FF9100",
    width: "84%",
    height: "7%",
    marginTop: "10%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
  },
});
