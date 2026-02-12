import { images } from "@/constants";
import { cn } from "@/libs/utils";
import { useAuthStore } from "@/store/auth.store";
import { TabBarIconProps } from "@/type";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

const tabs = [
  {
    name: "index",
    title: "Home",
    icon: images.home,
  },
  {
    name: "search",
    title: "Search",
    icon: images.search,
  },
  {
    name: "cart",
    title: "Cart",
    icon: images.bag,
  },
  {
    name: "profile",
    title: "Profile",
    icon: images.person,
  },
];

export default function TabsLayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Redirect href="/sign-in" />;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomRightRadius: 50,
          borderBottomLeftRadius: 50,
          marginHorizontal: 20,
          height: 80,
          position: "absolute",
          bottom: 40,
          backgroundColor: "white",
          shadowColor: "#1a1a1a",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        },
      }}
    >
      {tabs?.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} title={tab.title} icon={tab.icon} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => (
  <View className="tab-icon">
    <Image
      source={icon}
      className="size-7"
      resizeMode="contain"
      tintColor={focused ? "#FE8C00" : "#5D5F6D"}
    />
    <Text
      className={cn(
        "text-sm font-bold",
        focused ? "text-primary" : "text-gray-200",
      )}
    >
      {title}
    </Text>
  </View>
);
