import React, { Ref } from "react";
import { FlatList, StyleSheet, ViewStyle } from "react-native";

type ScrollerProps<T> = {
  data: T[];
  horizontal?: boolean;
  ref ?: Ref<FlatList<T>>;
  renderItem: ({
    item,
    index,
  }: {
    item: T;
    index: number;
  }) => React.ReactElement;
  containerStyle?: ViewStyle | ViewStyle[];
  keyExtractor?: (item: T, index: number) => string;
};

function Scroller<T>({
  data,
  horizontal = true,
  renderItem,
  containerStyle,
  keyExtractor,
  ref = null,
  ...rest
}: ScrollerProps<T>) {
  return (
    <FlatList
      data={data}
      ref={ref}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.contentContainer, containerStyle]}
      renderItem={renderItem}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
  },
});

export default Scroller;
