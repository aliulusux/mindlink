import { Tabs } from "expo-router";
import { Heart, Plus, User, TrendingUp, Wind } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#12121A",
          borderTopWidth: 1,
          borderTopColor: "#1F1F2E",
          paddingTop: 8,
          height: 65,
        },
        tabBarActiveTintColor: "#8A2BE2",
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.4)",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="feed/index"
        options={{
          title: "Feel",
          tabBarIcon: ({ color, size }) => (
            <Heart
              size={24}
              color={color}
              fill={color === "#8A2BE2" ? color : "transparent"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="feed/[orbId]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="insights/index"
        options={{
          title: "Insights",
          tabBarIcon: ({ color, size }) => (
            <TrendingUp size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create/index"
        options={{
          title: "Create",
          tabBarIcon: ({ color, size }) => (
            <Plus size={28} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="breathe/index"
        options={{
          title: "Breathe",
          tabBarIcon: ({ color, size }) => <Wind size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "You",
          tabBarIcon: ({ color, size }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
