import { AuthProvider } from "@/context/auth-context";
import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
	return (
		<AuthProvider>
			<Stack>
				<Stack.Screen options={{ headerShown: false }} name="index" />
				<Stack.Screen options={{ headerShown: false }} name="(auth)" />
				<Stack.Screen options={{ headerShown: false }} name="(tabs)" />
			</Stack>
		</AuthProvider>
	);
}
