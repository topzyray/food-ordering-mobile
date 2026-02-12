import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import { signIn } from "@/libs/appwrite";
import * as Sentry from "@sentry/react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

export default function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    const { email, password } = form;
    if (!email || !password) {
      return Alert.alert("Error", "Please enter valid email or password");
    }
    setIsSubmitting(true);

    try {
      await signIn({ email, password });
      router.push("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
      Sentry.captureEvent(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
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
      <CustomButton onPress={submit} title="Sign In" isLoading={isSubmitting} />

      <View className="flex-center flex-row mt-5 gap-2">
        <Text className="base-regular text-gray-100">
          Don&apos;t have an account?
        </Text>
        <Link href="/sign-up" className="base-bold text-primary">
          Sign Up
        </Link>
      </View>
    </View>
  );
}
