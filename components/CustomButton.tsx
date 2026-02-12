import { cn } from "@/libs/utils";
import { CustomButtonProps } from "@/type";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export function CustomButton({
  onPress,
  title = "Click Me",
  style,
  textStyle,
  leftIcon,
  isLoading = false,
}: Readonly<CustomButtonProps>) {
  return (
    <TouchableOpacity
      className={cn("custom-btn", style)}
      onPress={onPress}
      disabled={isLoading}
    >
      {leftIcon}

      <View className="flex-center flex-row">
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text className={cn("text-white-100 paragraph-semibold", textStyle)}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
