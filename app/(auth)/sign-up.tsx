import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import { createUser } from "@/libs/appwrite";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

export default function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async () => {
    const { name, email, password } = form;
    if (!name || !email || !password) {
      return Alert.alert("Error", "Please enter name, valid email or password");
    }
    setIsSubmitting(true);

    try {
      await createUser({ name, email, password });
      router.push("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter full name"
        value={form.name}
        onChangeText={(text) =>
          setForm((prev) => ({
            ...prev,
            name: text,
          }))
        }
        label="Full Name"
        readOnly={isSubmitting}
      />
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) =>
          setForm((prev) => ({
            ...prev,
            email: text,
          }))
        }
        label="Email"
        key="email-address"
        readOnly={isSubmitting}
      />
      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({
            ...prev,
            password: text,
          }))
        }
        label="Password"
        secureTextEntry={true}
        readOnly={isSubmitting}
      />
      <CustomButton onPress={submit} title="Sign Up" isLoading={isSubmitting} />

      <View className="flex-center flex-row mt-5 gap-2">
        <Text className="base-regular text-gray-100">
          Already have an account?
        </Text>
        <Link href="/sign-in" className="base-bold text-primary">
          Sign In
        </Link>
      </View>
    </View>
  );
}
