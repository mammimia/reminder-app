import "@bacons/text-decoder/install";

import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "nativewind";

import { TRPCProvider } from "~/utils/api";

import "../styles.css";

import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import Accounting from "./accounting";
import DailyRoutine from "./daily-routine";
import Reminder from "./reminder";

// This is the main layout of the app
// It wraps your pages with the providers they need

const Tab = createBottomTabNavigator();

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const { goBack, canGoBack } = useNavigation();
  return (
    <TRPCProvider>
      {/*
      Add back button to the header
        */}
      <StatusBar />
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => {
            if (!canGoBack()) {
              return null;
            }

            return (
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  padding: 10,
                }}
                onPress={goBack}
              >
                <Text>
                  <Ionicons name="arrow-back" size={18} color="white" />
                </Text>
              </TouchableOpacity>
            );
          },
        }}
      >
        <Tab.Screen name="reminder/index" component={Reminder} />
        <Tab.Screen name="daily-routine/index" component={DailyRoutine} />
        <Tab.Screen name="accounting/index" component={Accounting} />
      </Tab.Navigator>
    </TRPCProvider>
  );
}
