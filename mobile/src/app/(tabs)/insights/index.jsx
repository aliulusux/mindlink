import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  TrendingUp,
  Heart,
  Zap,
  Calendar,
  Activity,
  Award,
} from "lucide-react-native";
import useMindLinkFonts from "@/hooks/useMindLinkFonts";
import { useThemeStore } from "@/utils/themeStore";
import AppHeader from "@/components/AppHeader";

const { width: screenWidth } = Dimensions.get("window");

function InsightCard({ icon: Icon, title, value, subtitle, color }) {
  const { theme } = useThemeStore();
  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: `${color}20`,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 16,
          }}
        >
          <Icon size={24} color={color} />
        </View>
        <Text
          style={{
            fontFamily: "PTSans_700Bold",
            fontSize: 18,
            color: theme.colors.text,
            flex: 1,
          }}
        >
          {title}
        </Text>
      </View>
      <Text
        style={{
          fontFamily: "PTSans_700Bold",
          fontSize: 36,
          color: theme.colors.text,
          marginBottom: 4,
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontFamily: "PTSans_400Regular",
          fontSize: 14,
          color: theme.colors.textSecondary,
        }}
      >
        {subtitle}
      </Text>
    </View>
  );
}

function MoodDistribution() {
  const { theme } = useThemeStore();
  const moods = [
    { name: "Hopeful", percentage: 35, color: "#FF69B4" },
    { name: "Calm", percentage: 25, color: "#1E90FF" },
    { name: "Excited", percentage: 20, color: "#FFD700" },
    { name: "Grateful", percentage: 15, color: "#32CD32" },
    { name: "Reflective", percentage: 5, color: "#9370DB" },
  ];

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: 16,
      }}
    >
      <Text
        style={{
          fontFamily: "PTSans_700Bold",
          fontSize: 18,
          color: theme.colors.text,
          marginBottom: 16,
        }}
      >
        Mood Distribution
      </Text>
      {moods.map((mood, index) => (
        <View key={index} style={{ marginBottom: 12 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <Text
              style={{
                fontFamily: "PTSans_400Regular",
                fontSize: 14,
                color: theme.colors.textSecondary,
              }}
            >
              {mood.name}
            </Text>
            <Text
              style={{
                fontFamily: "PTSans_700Bold",
                fontSize: 14,
                color: theme.colors.text,
              }}
            >
              {mood.percentage}%
            </Text>
          </View>
          <View
            style={{
              height: 8,
              backgroundColor: theme.colors.border,
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: "100%",
                width: `${mood.percentage}%`,
                backgroundColor: mood.color,
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

export default function InsightsScreen() {
  const insets = useSafeAreaInsets();
  const fontsLoaded = useMindLinkFonts();
  const { theme } = useThemeStore();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar style="light" />
      <AppHeader />

      <LinearGradient
        colors={[theme.colors.gradient1, "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "70%",
          height: "40%",
        }}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: insets.bottom + 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontFamily: "PTSans_700Bold",
            fontSize: 32,
            color: theme.colors.text,
            marginBottom: 8,
          }}
        >
          Emotional Insights
        </Text>
        <Text
          style={{
            fontFamily: "PTSans_400Regular",
            fontSize: 16,
            color: theme.colors.textSecondary,
            marginBottom: 24,
          }}
        >
          Your journey at a glance
        </Text>

        {/* Streak Card */}
        <View
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: 20,
            padding: 24,
            borderWidth: 1,
            borderColor: theme.colors.border,
            marginBottom: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: "PTSans_700Bold",
                  fontSize: 48,
                  color: theme.colors.primary,
                }}
              >
                7
              </Text>
              <Text
                style={{
                  fontFamily: "PTSans_400Regular",
                  fontSize: 14,
                  color: theme.colors.textSecondary,
                }}
              >
                Day Streak 🔥
              </Text>
            </View>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: `${theme.colors.primary}20`,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Zap size={40} color={theme.colors.primary} />
            </View>
          </View>
          <Text
            style={{
              fontFamily: "PTSans_400Regular",
              fontSize: 14,
              color: theme.colors.textSecondary,
            }}
          >
            Keep it up! Share your mood daily to maintain your streak
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <View style={{ flex: 1 }}>
            <InsightCard
              icon={Heart}
              title="Total Moods"
              value="24"
              subtitle="Shared this month"
              color="#FF69B4"
            />
          </View>
          <View style={{ flex: 1 }}>
            <InsightCard
              icon={Activity}
              title="Avg Match"
              value="87%"
              subtitle="Wavelength score"
              color={theme.colors.primary}
            />
          </View>
        </View>

        <InsightCard
          icon={TrendingUp}
          title="Peak Time"
          value="8-10 PM"
          subtitle="Most active mood sharing period"
          color="#FFD700"
        />

        <MoodDistribution />

        {/* Achievements */}
        <View
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: 20,
            padding: 20,
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          <Text
            style={{
              fontFamily: "PTSans_700Bold",
              fontSize: 18,
              color: theme.colors.text,
              marginBottom: 16,
            }}
          >
            Recent Achievements
          </Text>
          {[
            { icon: "🔥", title: "7 Day Streak", date: "Today" },
            { icon: "💫", title: "50 Connections", date: "2 days ago" },
            { icon: "🌟", title: "First Match", date: "1 week ago" },
          ].map((achievement, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: index < 2 ? 12 : 0,
              }}
            >
              <Text style={{ fontSize: 32, marginRight: 16 }}>
                {achievement.icon}
              </Text>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "PTSans_700Bold",
                    fontSize: 16,
                    color: theme.colors.text,
                  }}
                >
                  {achievement.title}
                </Text>
                <Text
                  style={{
                    fontFamily: "PTSans_400Regular",
                    fontSize: 12,
                    color: theme.colors.textSecondary,
                  }}
                >
                  {achievement.date}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
