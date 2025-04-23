import { useAuth } from "@/context/auth-context";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
	const { authState } = useAuth();

	// const router = useRouter();
	// if (!authState?.authenticated) {
	// 	router.push("/(auth)/sign-in");
	// }
	return (
		<View className="flex bg-blue-200">
			<Text>Ripe Sensei</Text>
			<Link href={"/sign-in"}>SignIn</Link>
		</View>
	);
}
