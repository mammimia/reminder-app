import { SafeAreaView, Text, View } from "react-native";
import { Stack } from "expo-router";

export default function Reminder() {
  return (
    <SafeAreaView className="bg-background">
      <Stack.Screen options={{ title: "Reminder" }} />
      <View className="h-full w-full p-4">
        <Text className="py-2 text-3xl font-bold text-primary">
          Reminder Screen
        </Text>
        <Text className="py-4 text-foreground">Test</Text>
      </View>
    </SafeAreaView>
  );
}
