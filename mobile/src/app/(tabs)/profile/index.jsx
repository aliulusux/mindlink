import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  MapPin,
  Calendar,
  Users,
  Bell,
  Award,
  Info,
  LogOut,
  ChevronRight,
  Globe,
  MessageCircle,
  UserPlus,
  UserMinus,
  X,
  Settings,
  Crown,
  Star,
  Heart,
  Zap,
  Target,
  Shield,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";
import useMindLinkFonts from "../../../hooks/useMindLinkFonts";
import { useThemeStore } from "../../../utils/themeStore";
import AppHeader from "../../../components/AppHeader";
import useUser from "../../../utils/auth/useUser";
import { useAuth } from "../../../utils/auth/useAuth";
import {
  SUPPORTED_LANGUAGES,
  getTranslation,
  getCurrentLanguage,
  setLanguage,
} from "../../../utils/languages";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const fontsLoaded = useMindLinkFonts();
  const { theme } = useThemeStore();
  const { data: user, loading: userLoading } = useUser();
  const { signOut } = useAuth();

  // Language state
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  // User settings
  const [pushNotifications, setPushNotifications] = useState(true);
  const [profileStats, setProfileStats] = useState({
    moodOrbs: 47,
    followers: 284,
    following: 163,
    daysActive: 89,
    notifications: 7,
  });

  // Achievements data (showing 20 recent/notable ones)
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      name: "First Mood",
      desc: "Created your first mood orb",
      icon: "🌟",
      earned: true,
      rare: false,
      points: 10,
    },
    {
      id: 2,
      name: "Mood Artist",
      desc: "Created 10 mood orbs",
      icon: "🎨",
      earned: true,
      rare: false,
      points: 20,
    },
    {
      id: 3,
      name: "Social Butterfly",
      desc: "Followed 10 users",
      icon: "🦋",
      earned: true,
      rare: false,
      points: 20,
    },
    {
      id: 4,
      name: "Popular Soul",
      desc: "Gained 25 followers",
      icon: "⭐",
      earned: true,
      rare: false,
      points: 30,
    },
    {
      id: 5,
      name: "AI Whisperer",
      desc: "Used AI analysis 100 times",
      icon: "🤖",
      earned: true,
      rare: false,
      points: 40,
    },
    {
      id: 6,
      name: "Voice Virtuoso",
      desc: "Used voice input 50 times",
      icon: "🎙️",
      earned: true,
      rare: false,
      points: 30,
    },
    {
      id: 7,
      name: "Music Explorer",
      desc: "Tried all 8 music genres",
      icon: "🎶",
      earned: true,
      rare: false,
      points: 30,
    },
    {
      id: 8,
      name: "Daily Checker",
      desc: "Created moods for 7 days straight",
      icon: "📅",
      earned: true,
      rare: false,
      points: 25,
    },
    {
      id: 9,
      name: "Emotional Spectrum",
      desc: "Experience all mood categories",
      icon: "🌈",
      earned: true,
      rare: false,
      points: 50,
    },
    {
      id: 10,
      name: "Community Leader",
      desc: "Gained 100 followers",
      icon: "👑",
      earned: false,
      rare: false,
      points: 50,
    },
    {
      id: 11,
      name: "Influencer",
      desc: "Gained 500 followers",
      icon: "🌟",
      earned: false,
      rare: true,
      points: 100,
    },
    {
      id: 12,
      name: "Mood Celebrity",
      desc: "Gained 1000 followers",
      icon: "🏆",
      earned: false,
      rare: true,
      points: 200,
    },
    {
      id: 13,
      name: "Legendary Creator",
      desc: "Created 500 mood orbs",
      icon: "👑",
      earned: false,
      rare: true,
      points: 500,
    },
    {
      id: 14,
      name: "Global Communicator",
      desc: "Used all 6 supported languages",
      icon: "🌍",
      earned: false,
      rare: true,
      points: 60,
    },
    {
      id: 15,
      name: "Mood Oracle",
      desc: "Predict community mood trends",
      icon: "🔮",
      earned: false,
      rare: true,
      points: 150,
    },
    {
      id: 16,
      name: "Viral Mood",
      desc: "Got 1000 reactions on your orbs",
      icon: "🔥",
      earned: false,
      rare: true,
      points: 150,
    },
    {
      id: 17,
      name: "Mood Monk",
      desc: "Created moods for 100 days straight",
      icon: "🧘",
      earned: false,
      rare: true,
      points: 150,
    },
    {
      id: 18,
      name: "Century Club",
      desc: "Reach 100 total achievements",
      icon: "💯",
      earned: false,
      rare: true,
      points: 200,
    },
    {
      id: 19,
      name: "MindLink Pioneer",
      desc: "Be among first 100 users",
      icon: "🚀",
      earned: false,
      rare: true,
      points: 200,
    },
    {
      id: 20,
      name: "Legend Status",
      desc: "Achieve legendary user status",
      icon: "👑",
      earned: false,
      rare: true,
      points: 1000,
    },
  ]);

  const [notifications] = useState([
    {
      id: 1,
      type: "follow",
      message: "Sarah started following you",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      type: "like",
      message: "Your mood orb got 12 new reactions",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "achievement",
      message: 'You earned "Music Explorer" achievement!',
      time: "3 hours ago",
      read: false,
    },
    {
      id: 4,
      type: "message",
      message: "Alex sent you a message",
      time: "5 hours ago",
      read: true,
    },
    {
      id: 5,
      type: "follow",
      message: "Mike started following you",
      time: "1 day ago",
      read: true,
    },
    {
      id: 6,
      type: "system",
      message: "New features available in MindLink!",
      time: "2 days ago",
      read: true,
    },
    {
      id: 7,
      type: "like",
      message: 'Your mood orb "Joy Explosion" is trending!',
      time: "3 days ago",
      read: true,
    },
  ]);

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = getCurrentLanguage();
      setCurrentLanguage(savedLanguage);
    };
    loadLanguage();
  }, []);

  const t = (key) => getTranslation(currentLanguage, key);

  const handleToggle = (setter, value) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setter(!value);
  };

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    setLanguage(language);
    setShowLanguageModal(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut();
            router.replace("/account/signin");
          } catch (error) {
            console.error("Sign out error:", error);
          }
        },
      },
    ]);
  };

  const earnedAchievements = achievements.filter((a) => a.earned);
  const totalPoints = earnedAchievements.reduce((sum, a) => sum + a.points, 0);

  if (!fontsLoaded || userLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text
          style={{
            fontFamily: "PTSans_400Regular",
            fontSize: 16,
            color: theme.colors.text,
            marginTop: 16,
          }}
        >
          Loading profile...
        </Text>
      </View>
    );
  }

  const getUserGreeting = () => {
    const hour = new Date().getHours();
    let greeting = t("hello");

    if (hour < 12) {
      greeting =
        currentLanguage === "en"
          ? "Good morning"
          : currentLanguage === "zh"
            ? "早上好"
            : currentLanguage === "ja"
              ? "おはようございます"
              : currentLanguage === "ko"
                ? "좋은 아침"
                : currentLanguage === "hi"
                  ? "शुभ प्रभात"
                  : currentLanguage === "tr"
                    ? "Günaydın"
                    : "Good morning";
    } else if (hour < 18) {
      greeting =
        currentLanguage === "en"
          ? "Good afternoon"
          : currentLanguage === "zh"
            ? "下午好"
            : currentLanguage === "ja"
              ? "こんにちは"
              : currentLanguage === "ko"
                ? "좋은 오후"
                : currentLanguage === "hi"
                  ? "शुभ दोपहर"
                  : currentLanguage === "tr"
                    ? "İyi öğleden sonra"
                    : "Good afternoon";
    } else {
      greeting =
        currentLanguage === "en"
          ? "Good evening"
          : currentLanguage === "zh"
            ? "晚上好"
            : currentLanguage === "ja"
              ? "こんばんは"
              : currentLanguage === "ko"
                ? "좋은 저녁"
                : currentLanguage === "hi"
                  ? "शुभ संध्या"
                  : currentLanguage === "tr"
                    ? "İyi akşamlar"
                    : "Good evening";
    }

    return `${greeting}, ${user?.name || user?.username || "Soul"}! ✨`;
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar style="light" />
      <AppHeader />

      {/* Ambient background */}
      <LinearGradient
        colors={[theme.colors.gradient1, "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "60%",
          height: "35%",
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
        {/* Header with Greeting */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <MapPin
              size={24}
              color={theme.colors.primary}
              style={{ marginRight: 8 }}
            />
            <Text
              style={{
                fontFamily: "PTSans_700Bold",
                fontSize: 32,
                color: theme.colors.text,
              }}
            >
              {t("profile")}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "PTSans_400Regular",
              fontSize: 16,
              color: theme.colors.textSecondary,
              marginBottom: 8,
            }}
          >
            {t("customizeExperience")}
          </Text>
          <Text
            style={{
              fontFamily: "PTSans_700Bold",
              fontSize: 18,
              color: theme.colors.primary,
            }}
          >
            {getUserGreeting()}
          </Text>
        </View>

        {/* User Card */}
        <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
          <View
            style={{
              backgroundColor: theme.colors.card,
              borderRadius: 20,
              padding: 24,
              borderWidth: 1,
              borderColor: theme.colors.border,
              alignItems: "center",
            }}
          >
            {/* Avatar */}
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: theme.colors.avatar,
                borderWidth: 3,
                borderColor: theme.colors.primary,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Text style={{ fontSize: 40 }}>
                {user?.name ? user.name.charAt(0).toUpperCase() : "🧠"}
              </Text>
            </View>

            <Text
              style={{
                fontFamily: "PTSans_700Bold",
                fontSize: 24,
                color: theme.colors.text,
                marginBottom: 4,
              }}
            >
              {user?.name || user?.username || "Mindful Soul"}
            </Text>
            <Text
              style={{
                fontFamily: "PTSans_400Regular",
                fontSize: 14,
                color: theme.colors.textSecondary,
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              @{user?.username || "mindful_soul"}
            </Text>
            <Text
              style={{
                fontFamily: "PTSans_400Regular",
                fontSize: 14,
                color: theme.colors.textSecondary,
                textAlign: "center",
              }}
            >
              {t("emotionalWavelenghts")}
            </Text>

            {/* Follow buttons row */}
            <View style={{ flexDirection: "row", marginTop: 16, gap: 12 }}>
              <TouchableOpacity
                onPress={() => setShowFollowersModal(true)}
                style={{
                  backgroundColor: `${theme.colors.primary}20`,
                  borderRadius: 12,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderWidth: 1,
                  borderColor: theme.colors.primary,
                }}
              >
                <Text
                  style={{
                    fontFamily: "PTSans_700Bold",
                    fontSize: 12,
                    color: theme.colors.primary,
                  }}
                >
                  {profileStats.followers} Followers
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setShowFollowingModal(true)}
                style={{
                  backgroundColor: `${theme.colors.secondary}20`,
                  borderRadius: 12,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderWidth: 1,
                  borderColor: theme.colors.secondary,
                }}
              >
                <Text
                  style={{
                    fontFamily: "PTSans_700Bold",
                    fontSize: 12,
                    color: theme.colors.secondary,
                  }}
                >
                  {profileStats.following} Following
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View
          style={{
            paddingHorizontal: 20,
            marginBottom: 32,
            flexDirection: "row",
            gap: 12,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: theme.colors.card,
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: theme.colors.border,
              alignItems: "center",
            }}
          >
            <Calendar
              size={24}
              color={theme.colors.primary}
              style={{ marginBottom: 8 }}
            />
            <Text
              style={{
                fontFamily: "PTSans_700Bold",
                fontSize: 24,
                color: theme.colors.text,
                marginBottom: 4,
              }}
            >
              {profileStats.moodOrbs}
            </Text>
            <Text
              style={{
                fontFamily: "PTSans_400Regular",
                fontSize: 12,
                color: theme.colors.textSecondary,
                textAlign: "center",
              }}
            >
              {t("moodOrbs")}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: theme.colors.card,
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: theme.colors.border,
              alignItems: "center",
            }}
          >
            <Award
              size={24}
              color={theme.colors.secondary}
              style={{ marginBottom: 8 }}
            />
            <Text
              style={{
                fontFamily: "PTSans_700Bold",
                fontSize: 24,
                color: theme.colors.text,
                marginBottom: 4,
              }}
            >
              {earnedAchievements.length}
            </Text>
            <Text
              style={{
                fontFamily: "PTSans_400Regular",
                fontSize: 12,
                color: theme.colors.textSecondary,
                textAlign: "center",
              }}
            >
              {t("achievements")}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: theme.colors.card,
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: theme.colors.border,
              alignItems: "center",
            }}
          >
            <Zap
              size={24}
              color={theme.colors.secondary}
              style={{ marginBottom: 8 }}
            />
            <Text
              style={{
                fontFamily: "PTSans_700Bold",
                fontSize: 24,
                color: theme.colors.text,
                marginBottom: 4,
              }}
            >
              {profileStats.daysActive}
            </Text>
            <Text
              style={{
                fontFamily: "PTSans_400Regular",
                fontSize: 12,
                color: theme.colors.textSecondary,
                textAlign: "center",
              }}
            >
              {t("daysActive")}
            </Text>
          </View>
        </View>

        {/* Activity Section */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: "PTSans_700Bold",
              fontSize: 14,
              color: theme.colors.textSecondary,
              letterSpacing: 1,
              marginBottom: 12,
            }}
          >
            {t("activity")}
          </Text>

          <TouchableOpacity
            onPress={() => setShowNotificationsModal(true)}
            style={{
              backgroundColor: theme.colors.card,
              borderRadius: 16,
              padding: 18,
              borderWidth: 1,
              borderColor: theme.colors.border,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: theme.colors.avatar,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 16,
              }}
            >
              <Bell size={22} color={theme.colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "PTSans_700Bold",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginBottom: 2,
                }}
              >
                {t("notifications")}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: theme.colors.error,
                borderRadius: 10,
                width: 20,
                height: 20,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 8,
              }}
            >
              <Text
                style={{
                  fontFamily: "PTSans_700Bold",
                  fontSize: 11,
                  color: theme.colors.text,
                }}
              >
                {profileStats.notifications}
              </Text>
            </View>
            <ChevronRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowAchievementsModal(true)}
            style={{
              backgroundColor: theme.colors.card,
              borderRadius: 16,
              padding: 18,
              borderWidth: 1,
              borderColor: theme.colors.border,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: "rgba(255, 215, 0, 0.2)",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 16,
              }}
            >
              <Award size={22} color={theme.colors.secondary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "PTSans_700Bold",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginBottom: 2,
                }}
              >
                {t("achievements")} ({earnedAchievements.length}/120)
              </Text>
              <Text
                style={{
                  fontFamily: "PTSans_400Regular",
                  fontSize: 12,
                  color: theme.colors.textSecondary,
                }}
              >
                {totalPoints} points earned
              </Text>
            </View>
            <ChevronRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Preferences Section */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: "PTSans_700Bold",
              fontSize: 14,
              color: theme.colors.textSecondary,
              letterSpacing: 1,
              marginBottom: 12,
            }}
          >
            {t("preferences")}
          </Text>

          <View
            style={{
              backgroundColor: theme.colors.surface,
              borderRadius: 16,
              padding: 18,
              borderWidth: 1,
              borderColor: theme.colors.border,
              marginBottom: 12,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: `${theme.colors.primary}20`,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 16,
                  }}
                >
                  <Bell size={22} color={theme.colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: "PTSans_700Bold",
                      fontSize: 16,
                      color: theme.colors.text,
                      marginBottom: 2,
                    }}
                  >
                    {t("pushNotifications")}
                  </Text>
                </View>
              </View>
              <Switch
                value={pushNotifications}
                onValueChange={() =>
                  handleToggle(setPushNotifications, pushNotifications)
                }
                trackColor={{
                  false: "rgba(255, 255, 255, 0.2)",
                  true: theme.colors.primary,
                }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => setShowLanguageModal(true)}
            style={{
              backgroundColor: theme.colors.surface,
              borderRadius: 16,
              padding: 18,
              borderWidth: 1,
              borderColor: theme.colors.border,
              marginBottom: 12,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: `${theme.colors.secondary}20`,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 16,
                  }}
                >
                  <Globe size={22} color={theme.colors.secondary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: "PTSans_700Bold",
                      fontSize: 16,
                      color: theme.colors.text,
                      marginBottom: 2,
                    }}
                  >
                    {t("language")}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "PTSans_400Regular",
                      fontSize: 12,
                      color: theme.colors.textSecondary,
                    }}
                  >
                    {SUPPORTED_LANGUAGES[currentLanguage]?.nativeName ||
                      "English"}
                  </Text>
                </View>
              </View>
              <ChevronRight size={20} color={theme.colors.textSecondary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: "PTSans_700Bold",
              fontSize: 14,
              color: theme.colors.textSecondary,
              letterSpacing: 1,
              marginBottom: 12,
            }}
          >
            {t("about")}
          </Text>

          <TouchableOpacity
            onPress={() => setShowAboutModal(true)}
            style={{
              backgroundColor: theme.colors.card,
              borderRadius: 16,
              padding: 18,
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: theme.colors.avatar,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 16,
                }}
              >
                <Info size={22} color={theme.colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "PTSans_700Bold",
                    fontSize: 16,
                    color: theme.colors.text,
                  }}
                >
                  {t("aboutMindLink")}
                </Text>
              </View>
              <ChevronRight size={20} color={theme.colors.textSecondary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Sign Out Button - RED */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <TouchableOpacity
            onPress={handleSignOut}
            style={{
              backgroundColor: "#DC2626", // Red color
              borderRadius: 16,
              padding: 18,
              borderWidth: 1,
              borderColor: "#DC2626",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LogOut size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text
              style={{
                fontFamily: "PTSans_700Bold",
                fontSize: 16,
                color: "#FFFFFF",
              }}
            >
              {t("signOut")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={{ alignItems: "center", paddingBottom: 20 }}>
          <Text
            style={{
              fontFamily: "PTSans_700Bold",
              fontSize: 14,
              color: theme.colors.textSecondary,
              marginBottom: 4,
            }}
          >
            {t("version")}
          </Text>
          <Text
            style={{
              fontFamily: "PTSans_400Regular",
              fontSize: 12,
              color: theme.colors.textSecondary,
            }}
          >
            {t("tagline")}
          </Text>
        </View>
      </ScrollView>

      {/* Language Selection Modal */}
      <Modal
        visible={showLanguageModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowLanguageModal(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: theme.colors.background,
              borderRadius: 24,
              padding: 24,
              width: "100%",
              maxWidth: 400,
              borderWidth: 1,
              borderColor: theme.colors.border,
              maxHeight: "80%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <Globe
                size={24}
                color={theme.colors.secondary}
                style={{ marginRight: 12 }}
              />
              <Text
                style={{
                  fontFamily: "PTSans_700Bold",
                  fontSize: 24,
                  color: theme.colors.text,
                  flex: 1,
                }}
              >
                {t("language")}
              </Text>
              <TouchableOpacity
                onPress={() => setShowLanguageModal(false)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: theme.colors.surface,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <X size={20} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ maxHeight: 400 }}
            >
              {Object.entries(SUPPORTED_LANGUAGES).map(([code, lang]) => (
                <TouchableOpacity
                  key={code}
                  onPress={() => handleLanguageChange(code)}
                  style={{
                    backgroundColor:
                      currentLanguage === code
                        ? `${theme.colors.primary}20`
                        : theme.colors.surface,
                    borderRadius: 16,
                    padding: 16,
                    marginBottom: 12,
                    borderWidth: 2,
                    borderColor:
                      currentLanguage === code
                        ? theme.colors.primary
                        : theme.colors.border,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 24, marginRight: 16 }}>
                    {lang.flag}
                  </Text>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: "PTSans_700Bold",
                        fontSize: 16,
                        color: theme.colors.text,
                        marginBottom: 2,
                      }}
                    >
                      {lang.nativeName}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "PTSans_400Regular",
                        fontSize: 12,
                        color: theme.colors.textSecondary,
                      }}
                    >
                      {lang.name}
                    </Text>
                  </View>
                  {currentLanguage === code && (
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: theme.colors.primary,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "#FFFFFF", fontSize: 12 }}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* About MindLink Modal */}
      <Modal
        visible={showAboutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAboutModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowAboutModal(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: theme.colors.background,
              borderRadius: 24,
              padding: 24,
              width: "100%",
              maxWidth: 400,
              borderWidth: 1,
              borderColor: theme.colors.border,
              maxHeight: "85%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <Info
                size={24}
                color={theme.colors.primary}
                style={{ marginRight: 12 }}
              />
              <Text
                style={{
                  fontFamily: "PTSans_700Bold",
                  fontSize: 24,
                  color: theme.colors.text,
                  flex: 1,
                }}
              >
                {t("aboutTitle")}
              </Text>
              <TouchableOpacity
                onPress={() => setShowAboutModal(false)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: theme.colors.surface,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <X size={20} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ alignItems: "center", marginBottom: 24 }}>
                <img
                  src="https://ucarecdn.com/851c9a95-cf86-442e-8654-9b67b70706d3/-/format/auto/"
                  style={{ width: 80, height: 80, marginBottom: 16 }}
                />
                <Text
                  style={{
                    fontFamily: "PTSans_700Bold",
                    fontSize: 28,
                    color: theme.colors.primary,
                    marginBottom: 8,
                  }}
                >
                  MindLink
                </Text>
                <Text
                  style={{
                    fontFamily: "PTSans_400Regular",
                    fontSize: 14,
                    color: theme.colors.textSecondary,
                    textAlign: "center",
                  }}
                >
                  {t("tagline")}
                </Text>
              </View>

              <Text
                style={{
                  fontFamily: "PTSans_400Regular",
                  fontSize: 16,
                  color: theme.colors.text,
                  lineHeight: 24,
                  marginBottom: 24,
                  textAlign: "center",
                }}
              >
                {t("aboutDescription")}
              </Text>

              <Text
                style={{
                  fontFamily: "PTSans_700Bold",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginBottom: 16,
                }}
              >
                {t("features")}
              </Text>

              <View style={{ marginBottom: 24 }}>
                {[
                  "feature1",
                  "feature2",
                  "feature3",
                  "feature4",
                  "feature5",
                  "feature6",
                ].map((feature, index) => (
                  <Text
                    key={index}
                    style={{
                      fontFamily: "PTSans_400Regular",
                      fontSize: 14,
                      color: theme.colors.text,
                      marginBottom: 8,
                      lineHeight: 20,
                    }}
                  >
                    {t(feature)}
                  </Text>
                ))}
              </View>

              <View
                style={{
                  backgroundColor: `${theme.colors.primary}10`,
                  borderRadius: 16,
                  padding: 20,
                  marginBottom: 24,
                  borderWidth: 1,
                  borderColor: `${theme.colors.primary}30`,
                }}
              >
                <Text
                  style={{
                    fontFamily: "PTSans_700Bold",
                    fontSize: 16,
                    color: theme.colors.text,
                    marginBottom: 12,
                    textAlign: "center",
                  }}
                >
                  🔒 Community Guidelines
                </Text>
                <Text
                  style={{
                    fontFamily: "PTSans_400Regular",
                    fontSize: 14,
                    color: theme.colors.text,
                    lineHeight: 20,
                    textAlign: "center",
                  }}
                >
                  We maintain a positive environment. Profanity, hate speech,
                  and harmful content are strictly prohibited. AI monitors all
                  content to ensure a safe space for emotional expression. ✨
                </Text>
              </View>

              <View style={{ alignItems: "center", marginBottom: 20 }}>
                <Text
                  style={{
                    fontFamily: "PTSans_700Bold",
                    fontSize: 16,
                    color: theme.colors.primary,
                    marginBottom: 8,
                  }}
                >
                  {t("createdBy")}
                </Text>
                <Text
                  style={{
                    fontFamily: "PTSans_400Regular",
                    fontSize: 14,
                    color: theme.colors.textSecondary,
                    textAlign: "center",
                  }}
                >
                  Lead Developer: Anything AI Team 🤖
                </Text>
                <Text
                  style={{
                    fontFamily: "PTSans_400Regular",
                    fontSize: 12,
                    color: theme.colors.textSecondary,
                    textAlign: "center",
                    marginTop: 8,
                  }}
                >
                  "Connecting souls through technology and empathy"
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 12,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 16, marginRight: 8 }}>✨</Text>
                  <Text
                    style={{
                      fontFamily: "PTSans_400Regular",
                      fontSize: 12,
                      color: theme.colors.textSecondary,
                    }}
                  >
                    {t("version")}
                  </Text>
                  <Text style={{ fontSize: 16, marginLeft: 8 }}>✨</Text>
                </View>
              </View>
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Achievements Modal */}
      <Modal
        visible={showAchievementsModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAchievementsModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowAchievementsModal(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: theme.colors.background,
              borderRadius: 24,
              padding: 24,
              width: "100%",
              maxWidth: 400,
              borderWidth: 1,
              borderColor: theme.colors.border,
              maxHeight: "85%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <Award
                size={24}
                color={theme.colors.secondary}
                style={{ marginRight: 12 }}
              />
              <Text
                style={{
                  fontFamily: "PTSans_700Bold",
                  fontSize: 24,
                  color: theme.colors.text,
                  flex: 1,
                }}
              >
                {t("achievements")}
              </Text>
              <TouchableOpacity
                onPress={() => setShowAchievementsModal(false)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: theme.colors.surface,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <X size={20} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 20,
                backgroundColor: `${theme.colors.secondary}10`,
                borderRadius: 12,
                padding: 16,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: "PTSans_700Bold",
                    fontSize: 20,
                    color: theme.colors.text,
                  }}
                >
                  {earnedAchievements.length}
                </Text>
                <Text
                  style={{
                    fontFamily: "PTSans_400Regular",
                    fontSize: 12,
                    color: theme.colors.textSecondary,
                  }}
                >
                  Earned
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: "PTSans_700Bold",
                    fontSize: 20,
                    color: theme.colors.text,
                  }}
                >
                  {totalPoints}
                </Text>
                <Text
                  style={{
                    fontFamily: "PTSans_400Regular",
                    fontSize: 12,
                    color: theme.colors.textSecondary,
                  }}
                >
                  Points
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: "PTSans_700Bold",
                    fontSize: 20,
                    color: theme.colors.text,
                  }}
                >
                  120
                </Text>
                <Text
                  style={{
                    fontFamily: "PTSans_400Regular",
                    fontSize: 12,
                    color: theme.colors.textSecondary,
                  }}
                >
                  Total
                </Text>
              </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {achievements.map((achievement) => (
                <View
                  key={achievement.id}
                  style={{
                    backgroundColor: achievement.earned
                      ? `${theme.colors.primary}10`
                      : theme.colors.surface,
                    borderRadius: 16,
                    padding: 16,
                    marginBottom: 12,
                    borderWidth: achievement.rare ? 2 : 1,
                    borderColor: achievement.rare
                      ? achievement.earned
                        ? "#FFD700"
                        : `${theme.colors.secondary}30`
                      : achievement.earned
                        ? theme.colors.primary
                        : theme.colors.border,
                    opacity: achievement.earned ? 1 : 0.6,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 24, marginRight: 16 }}>
                      {achievement.icon}
                    </Text>
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 4,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "PTSans_700Bold",
                            fontSize: 16,
                            color: theme.colors.text,
                          }}
                        >
                          {achievement.name}
                        </Text>
                        {achievement.rare && (
                          <View
                            style={{
                              marginLeft: 8,
                              backgroundColor: "#FFD700",
                              borderRadius: 8,
                              paddingHorizontal: 6,
                              paddingVertical: 2,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 10,
                                color: "#000",
                                fontFamily: "PTSans_700Bold",
                              }}
                            >
                              RARE
                            </Text>
                          </View>
                        )}
                      </View>
                      <Text
                        style={{
                          fontFamily: "PTSans_400Regular",
                          fontSize: 12,
                          color: theme.colors.textSecondary,
                          marginBottom: 4,
                        }}
                      >
                        {achievement.desc}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "PTSans_700Bold",
                          fontSize: 12,
                          color: theme.colors.secondary,
                        }}
                      >
                        {achievement.points} points
                      </Text>
                    </View>
                    {achievement.earned && (
                      <View
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                          backgroundColor: theme.colors.primary,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ color: "#FFFFFF", fontSize: 12 }}>
                          ✓
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}

              <View
                style={{
                  marginTop: 20,
                  padding: 16,
                  backgroundColor: `${theme.colors.secondary}10`,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: `${theme.colors.secondary}30`,
                }}
              >
                <Text
                  style={{
                    fontFamily: "PTSans_700Bold",
                    fontSize: 16,
                    color: theme.colors.text,
                    marginBottom: 8,
                    textAlign: "center",
                  }}
                >
                  🎯 Achievement Rules
                </Text>
                <Text
                  style={{
                    fontFamily: "PTSans_400Regular",
                    fontSize: 12,
                    color: theme.colors.text,
                    lineHeight: 18,
                    textAlign: "center",
                  }}
                >
                  • Create mood orbs regularly to unlock creator achievements
                  {"\n"}• Follow and connect with others for social achievements
                  {"\n"}• Use all features to become a power user{"\n"}•
                  Maintain streaks for consistency rewards{"\n"}• Rare
                  achievements require special actions or milestones!
                </Text>
              </View>
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Notifications Modal */}
      <Modal
        visible={showNotificationsModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowNotificationsModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowNotificationsModal(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: theme.colors.background,
              borderRadius: 24,
              padding: 24,
              width: "100%",
              maxWidth: 400,
              borderWidth: 1,
              borderColor: theme.colors.border,
              maxHeight: "85%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <Bell
                size={24}
                color={theme.colors.primary}
                style={{ marginRight: 12 }}
              />
              <Text
                style={{
                  fontFamily: "PTSans_700Bold",
                  fontSize: 24,
                  color: theme.colors.text,
                  flex: 1,
                }}
              >
                {t("notifications")}
              </Text>
              <TouchableOpacity
                onPress={() => setShowNotificationsModal(false)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: theme.colors.surface,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <X size={20} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {notifications.map((notification) => (
                <View
                  key={notification.id}
                  style={{
                    backgroundColor: notification.read
                      ? theme.colors.surface
                      : `${theme.colors.primary}10`,
                    borderRadius: 16,
                    padding: 16,
                    marginBottom: 12,
                    borderWidth: 1,
                    borderColor: notification.read
                      ? theme.colors.border
                      : `${theme.colors.primary}30`,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: notification.read
                          ? "transparent"
                          : theme.colors.primary,
                        marginRight: 12,
                      }}
                    />
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontFamily: "PTSans_700Bold",
                          fontSize: 14,
                          color: theme.colors.text,
                          marginBottom: 4,
                        }}
                      >
                        {notification.message}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "PTSans_400Regular",
                          fontSize: 12,
                          color: theme.colors.textSecondary,
                        }}
                      >
                        {notification.time}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor:
                          notification.type === "follow"
                            ? `${theme.colors.primary}20`
                            : notification.type === "like"
                              ? `${theme.colors.error}20`
                              : notification.type === "achievement"
                                ? `${theme.colors.secondary}20`
                                : notification.type === "message"
                                  ? `${theme.colors.primary}20`
                                  : `${theme.colors.surface}`,
                        borderRadius: 12,
                        padding: 8,
                      }}
                    >
                      <Text style={{ fontSize: 16 }}>
                        {notification.type === "follow"
                          ? "👥"
                          : notification.type === "like"
                            ? "❤️"
                            : notification.type === "achievement"
                              ? "🏆"
                              : notification.type === "message"
                                ? "💬"
                                : "🔔"}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Followers Modal */}
      <Modal
        visible={showFollowersModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowFollowersModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowFollowersModal(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: theme.colors.background,
              borderRadius: 24,
              padding: 24,
              width: "100%",
              maxWidth: 400,
              borderWidth: 1,
              borderColor: theme.colors.border,
              maxHeight: "85%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <Users
                size={24}
                color={theme.colors.primary}
                style={{ marginRight: 12 }}
              />
              <Text
                style={{
                  fontFamily: "PTSans_700Bold",
                  fontSize: 24,
                  color: theme.colors.text,
                  flex: 1,
                }}
              >
                Followers ({profileStats.followers})
              </Text>
              <TouchableOpacity
                onPress={() => setShowFollowersModal(false)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: theme.colors.surface,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <X size={20} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <Text
              style={{
                fontFamily: "PTSans_400Regular",
                fontSize: 14,
                color: theme.colors.textSecondary,
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              🔒 Your followers list is private. Only you can see who follows
              you.
            </Text>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                paddingVertical: 40,
              }}
            >
              <Users
                size={48}
                color={theme.colors.textSecondary}
                style={{ marginBottom: 16 }}
              />
              <Text
                style={{
                  fontFamily: "PTSans_700Bold",
                  fontSize: 18,
                  color: theme.colors.text,
                  marginBottom: 8,
                }}
              >
                Your Community
              </Text>
              <Text
                style={{
                  fontFamily: "PTSans_400Regular",
                  fontSize: 14,
                  color: theme.colors.textSecondary,
                  textAlign: "center",
                  paddingHorizontal: 20,
                }}
              >
                You have {profileStats.followers} wonderful souls following your
                emotional journey. Keep creating amazing mood orbs to grow your
                community! ✨
              </Text>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Following Modal */}
      <Modal
        visible={showFollowingModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowFollowingModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowFollowingModal(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: theme.colors.background,
              borderRadius: 24,
              padding: 24,
              width: "100%",
              maxWidth: 400,
              borderWidth: 1,
              borderColor: theme.colors.border,
              maxHeight: "85%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <Heart
                size={24}
                color={theme.colors.secondary}
                style={{ marginRight: 12 }}
              />
              <Text
                style={{
                  fontFamily: "PTSans_700Bold",
                  fontSize: 24,
                  color: theme.colors.text,
                  flex: 1,
                }}
              >
                Following ({profileStats.following})
              </Text>
              <TouchableOpacity
                onPress={() => setShowFollowingModal(false)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: theme.colors.surface,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <X size={20} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <Text
              style={{
                fontFamily: "PTSans_400Regular",
                fontSize: 14,
                color: theme.colors.textSecondary,
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              🔒 Your following list is private. Only you can see who you
              follow.
            </Text>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                paddingVertical: 40,
              }}
            >
              <Heart
                size={48}
                color={theme.colors.textSecondary}
                style={{ marginBottom: 16 }}
              />
              <Text
                style={{
                  fontFamily: "PTSans_700Bold",
                  fontSize: 18,
                  color: theme.colors.text,
                  marginBottom: 8,
                }}
              >
                Your Connections
              </Text>
              <Text
                style={{
                  fontFamily: "PTSans_400Regular",
                  fontSize: 14,
                  color: theme.colors.textSecondary,
                  textAlign: "center",
                  paddingHorizontal: 20,
                }}
              >
                You're following {profileStats.following} amazing souls on their
                emotional journeys. Discover more users in the Feed to expand
                your network! 💫
              </Text>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
