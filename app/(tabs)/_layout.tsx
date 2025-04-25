// import { useAuth } from "@/context/auth-context";
// import { Redirect } from "expo-router";
import { Header } from "@/components";
import { useAuth } from "@/context/auth-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs, useRouter } from "expo-router";
import React from "react";

const TabsLayout = () => {
	const { authState } = useAuth();
	const router = useRouter();
	if (!authState?.authenticated) {
		router.push("/sign-in");
		return;
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
						title: "Home",
						headerRight: () => {
							return <Header.HeaderRight />;
						},
						headerStyle: {
							backgroundColor: "#0a0f1c",
						},
						headerTintColor: "white",

						tabBarIcon: ({ color, focused }) => (
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
						title: "Control",
						headerRight: () => {
							return <Header.HeaderRight />;
						},
						headerStyle: {
							backgroundColor: "#0a0f1c",
						},
						headerTintColor: "white",
						tabBarIcon: ({ color, focused }) => (
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
};

export default TabsLayout;
