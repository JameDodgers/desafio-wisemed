import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

import RightIcon from "@/assets/images/rightIcon.svg";

export type PickerItem = {
  id: number;
  name: string;
};

type PickerProps = {
  options?: PickerItem[];
  label: string;
  onSelect?: (item: PickerItem) => void;
};

export type PickerRef = {
  hide: () => void;
};

export const Picker = forwardRef<PickerRef, PickerProps>(
  ({ options, label, onSelect }, ref) => {
    const [selectedItem, setSelectedItem] = useState<PickerItem | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownHeight = useSharedValue(0);

    const toggleDropdown = () => {
      const isNowOpen = !isOpen;

      setIsOpen(isNowOpen);

      const height =
        isNowOpen && options
          ? options.length > 3
            ? 44 * 3
            : options.length * 44
          : 0;

      dropdownHeight.value = withTiming(height, {
        duration: 200,
      });
    };

    const animatedStyle = useAnimatedStyle(() => ({
      height: dropdownHeight.value,
      overflow: "hidden",
    }));

    const handleSelect = (item: PickerItem) => {
      setSelectedItem(item);
      onSelect?.(item);
      toggleDropdown();
    };

    useImperativeHandle(ref, () => ({
      hide: () => {
        if (isOpen) {
          toggleDropdown();
        }
      },
    }));

    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity
          style={styles.innerContainer}
          onPress={toggleDropdown}
        >
          <Text
            style={
              (styles.selectedLabel,
              { color: selectedItem?.name ? "#154FBF" : "#719EC0" })
            }
          >
            {selectedItem?.name ?? "Selecionar"}
          </Text>
          <RightIcon style={styles.rightIcon} />
        </TouchableOpacity>

        <Animated.View style={[styles.dropdown, animatedStyle]}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.optionLabel}>{item.name}</Text>
              </TouchableOpacity>
            )}
            bounces={false}
          />
        </Animated.View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 52,
    borderColor: "#154FBF",
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: "center",
  },
  innerContainer: {
    padding: 16,
    justifyContent: "center",
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    paddingHorizontal: 8,
    fontFamily: "Poppins-Medium",
    color: "#154FBF",
    top: -10,
    left: 8,
  },
  selectedLabel: {
    fontFamily: "Overpass-Regular",
  },
  dropdown: {
    marginTop: 4,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    ...StyleSheet.absoluteFillObject,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionLabel: {
    fontFamily: "Overpass-Regular",
    color: "#154FBF",
  },
  rightIcon: {
    position: "absolute",
    right: 8,
  },
});
