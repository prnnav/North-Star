import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function Dashboard() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Dashboard Page</Text>
      <Link href="/" style={{ fontSize: 18, color: "blue" }}>
        ⬅ Back to Home
      </Link>
    </View>
  );
}
