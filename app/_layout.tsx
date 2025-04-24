import { DrawerIcon, Logout, ProfileInfo, Settings } from "@/components";
import { icon } from "@/constant/icon";
import { AuthProvider } from "@/context/auth-context";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { usePathname, useRouter } from "expo-router";
import Drawer from "expo-router/drawer";
import React from "react";
import { View } from "react-native";
import "../global.css";

export default function RootLayout() {
	const route = useRouter();
	const pathName = usePathname();
	return (
		<AuthProvider>
			<Drawer
				screenOptions={{
					drawerStyle: {
						backgroundColor: "#161622",
					},
				}}
				drawerContent={(props) => (
					<View className="flex-1">
						<DrawerContentScrollView {...props}>
							<View className="flex flex-row justify-between items-center pb-4 w-full">
								<ProfileInfo />
								<Settings />
							</View>
							<DrawerItem
								label="Home"
								onPress={() => route.navigate("/Home")}
								icon={({ color }) => {
									return <DrawerIcon color={color} icon={icon.home} />;
								}}
								focused={pathName == "/Home" && true}
								inactiveTintColor="white"
								activeBackgroundColor="#40404a"
								activeTintColor="#ff5757"
								style={{
									borderRadius: 12,
									margin: 0,
									padding: 0,
								}}
							/>
							<DrawerItem
								label="Control"
								onPress={() => route.navigate("/Control")}
								icon={({ color }) => {
									return <DrawerIcon color={color} icon={icon.control} />;
								}}
								focused={pathName == "/Contact" && true}
								inactiveTintColor="white"
								activeBackgroundColor="#40404a"
								activeTintColor="#ff5757"
								style={{
									borderRadius: 12,
									margin: 0,
									padding: 0,
								}}
							/>
						</DrawerContentScrollView>
						<Logout />
					</View>
				)}
			>
				<Drawer.Screen options={{ headerShown: false }} name="index" />
				<Drawer.Screen options={{ headerShown: false }} name="(auth)" />
				<Drawer.Screen
					options={{
						headerShown: false,
					}}
					name="(tabs)"
				/>
			</Drawer>
		</AuthProvider>
	);
}
