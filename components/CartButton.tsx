import { images } from "@/constants";
import { Image, Text, TouchableOpacity, View } from "react-native";

export function CartButton() {
  const totalItems = 5;
  return (
    <TouchableOpacity className="cart-btn">
      <Image source={images.bag} className="size-5" resizeMode="contain" />

      {totalItems > 0 && (
        <View className="cart-badge">
          <Text className="text-white small-bold">{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
