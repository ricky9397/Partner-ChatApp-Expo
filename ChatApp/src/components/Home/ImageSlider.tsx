// import React, { useState } from "react";
// import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
// import Carousel, { Pagination } from "react-native-snap-carousel";

// const images = [
//   {
//     id: 1,
//     imageUrl: "https://picsum.photos/id/237/200/300",
//   },
//   {
//     id: 2,
//     imageUrl: "https://picsum.photos/seed/picsum/200/300",
//   },
//   {
//     id: 3,
//     imageUrl: "https://picsum.photos/200/300?grayscale",
//   },
//   {
//     id: 4,
//     imageUrl: "https://picsum.photos/200/300/?blur",
//   },
// ];

// const ImageSlider = () => {
//   const [activeSlide, setActiveSlide] = useState(0);

//   const renderItem = ({ item }: { item: { id: number; imageUrl: string } }) => {
//     return (
//       <View style={styles.slide}>
//         <TouchableOpacity>
//         <Image source={{ uri: item.imageUrl }} style={styles.image} />
//         </TouchableOpacity>
//       </View>
//     );
//   };
//   return (
//     <View style={styles.container}>
//       <Pagination
//         dotsLength={images.length}
//         activeDotIndex={activeSlide}
//         containerStyle={styles.paginationContainer}
//         dotStyle={styles.dot}
//         inactiveDotOpacity={0.4}
//         inactiveDotScale={0.6}
//       />
//       <Carousel
//         layout={'default'} 
//         data={images}
//         renderItem={renderItem}
//         sliderWidth={400}
//         itemWidth={400}
//         onSnapToItem={(index) => setActiveSlide(index)}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   slide: {
//     flex: 1,
//     borderRadius: 8,
//     overflow: "hidden",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//   },
//   paginationContainer: {
//     paddingVertical: 8,
//   },
//   dot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     marginHorizontal: 8,
//     backgroundColor: "rgba(0, 0, 0, 0.92)",
//   },
// });

// export default ImageSlider;
