import { Header } from "@/components";
import { useAuth } from "@/context/auth-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Redirect, Tabs, usePathname } from "expo-router";
import React from "react";

export default function TabLayout() {
	const { authState } = useAuth();
	const [isAuthenticated, setIsAthenticated] = React.useState(false);
	const pathName = usePathname();

	React.useEffect(() => {
		if (!authState?.authenticated) {
			setIsAthenticated(true);
			return;
		}
		setIsAthenticated(false);
		return;
	});

	if (isAuthenticated) {
		return <Redirect href={"/sign-in"} />;
	}

	return (
		<>
			<Tabs
				screenOptions={{
					headerShadowVisible: false,
					tabBarActiveTintColor: "#00ffb2",
					tabBarInactiveTintColor: "white",
					tabBarStyle: {
						backgroundColor: "#0a0f1c",
						borderTopWidth: 0,
					},
				}}
			>
				<Tabs.Screen
					name="Home"
					options={{
						href: pathName == "/Control" ? null : undefined,
						title: "Home",
						headerRight: () => {
							return pathName == "/Control" ? "" : <Header.HeaderRight />;
						},
						headerStyle: {
							backgroundColor: "#0a0f1c",
						},
						headerTintColor: "white",

						tabBarIcon: ({ color, focused }) =>
							pathName != "/Control" && (
								<FontAwesome6
									size={24}
									name="house"
									color={color}
									focusable={focused}
								/>
							),
					}}
				/>
				<Tabs.Screen
					name="Control"
					options={{
						href: pathName == "/Control" ? null : undefined,
						title: pathName == "/Control" ? " " : "Control",

						headerRight: () => {
							return pathName == "/Control" ? "" : <Header.HeaderRight />;
						},
						headerStyle: {
							backgroundColor: "#0a0f1c",
						},
						headerTintColor: "white",

						tabBarIcon: ({ color, focused }) =>
							pathName != "/Control" && (
								<MaterialIcons
									name="gamepad"
									size={28}
									color={color}
									focusable={focused}
								/>
							),
					}}
				/>
			</Tabs>
		</>
	);
}
