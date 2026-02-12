import { cn } from "@/libs/utils";
import { CustomInputProps } from "@/type";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

export function CustomInput({
  placeholder = "Enter text",
  value,
  label,
  readOnly,
  secureTextEntry = false,
  keyboardType = "default",
  onChangeText,
}: Readonly<CustomInputProps>) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-full">
      <Text className="label">{label}</Text>

      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        readOnly={readOnly}
        className={cn(
          "input",
          isFocused ? "border-primary" : "border-gray-300",
        )}
      />
    </View>
  );
}
