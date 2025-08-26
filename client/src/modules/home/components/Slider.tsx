import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

const { width } = Dimensions.get("window");
const SLIDE_MARGIN = 16;
const SLIDE_WIDTH = width - SLIDE_MARGIN * 2;

const Slider = ({
  images = [],
  style,
  imageStyle,
}: {
  images?: string[];
  style?: ViewStyle | ViewStyle[];
  imageStyle?: any;
}) => {
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll logic
  useEffect(() => {
    if (!images.length) return;
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      scrollRef.current?.scrollTo({
        x: nextIndex * SLIDE_WIDTH,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  // Manual scroll update
  const onScrollEnd = (event: any) => {
    const newIndex = Math.round(
      event.nativeEvent.contentOffset.x / SLIDE_WIDTH
    );
    setCurrentIndex(newIndex);
  };

  return (
    <View style={[styles.container, style]}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        snapToInterval={SLIDE_WIDTH}
        decelerationRate="fast"
      >
        {images.map((img: string, index: number) => (
          <Image
            key={index}
            source={{ uri: img }}
            style={[styles.image, { width: SLIDE_WIDTH }, imageStyle]}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
    // height: 150,
  },
  scrollView: {
    flexGrow: 0,
  },
  image: {
    height: 180,
    resizeMode: "cover",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#8d0801",
  },
});

export default Slider;
