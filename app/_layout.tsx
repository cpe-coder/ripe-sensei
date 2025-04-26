import { DrawerIcon, Logout, ProfileInfo, Settings } from "@/components";
import { icon } from "@/constant/icon";
import { AuthProvider } from "@/context/auth-context";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { usePathname, useRouter } from "expo-router";
import Drawer from "expo-router/drawer";
import * as ScreenOrientation from "expo-screen-orientation";
import React from "react";
import { View } from "react-native";
import "../global.css";

export default async function RootLayout() {
	const route = useRouter();
	const pathName = usePathname();

	React.useEffect(() => {
		const unlockScreenOerientation = async () => {
			if (pathName == "/Control") {
				await ScreenOrientation.lockAsync(
					ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
				);
			}

			if (pathName == "/Home") {
				await ScreenOrientation.lockAsync(
					ScreenOrientation.OrientationLock.PORTRAIT
				);
			}
		};
		unlockScreenOerientation();
	});

	return (
		<AuthProvider>
			<Drawer
				screenOptions={{
					drawerStyle: {
						backgroundColor: "#0a0f1c",
					},
				}}
				drawerContent={(props) => (
					<View className="flex-1">
						<DrawerContentScrollView {...props}>
							<ProfileInfo />
							<DrawerItem
								label="Home"
								onPress={() => route.navigate("/Home")}
								icon={({ color }) => {
									return <DrawerIcon color={color} icon={icon.home} />;
								}}
								focused={pathName == "/Home" && true}
								inactiveTintColor="white"
								activeBackgroundColor="#002b2e"
								activeTintColor="#00ffb2"
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
								focused={pathName == "/Control" && true}
								inactiveTintColor="white"
								activeBackgroundColor="#002b2e"
								activeTintColor="#00ffb2"
								style={{
									borderRadius: 12,
									margin: 0,
									padding: 0,
								}}
							/>
							<Settings />
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
