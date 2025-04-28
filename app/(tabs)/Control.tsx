import { useAuth } from "@/context/auth-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";

const Control = () => {
	const navigation = useNavigation();
	const [isVisible, setIsVisible] = React.useState(false);
	const router = useRouter();
	const { userData } = useAuth();

	React.useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			try {
				ScreenOrientation.lockAsync(
					ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
				);
				setIsVisible(true);
			} catch (error) {
				console.log(error);
			}
		});

		return unsubscribe;
	}, [navigation]);

	const handleBackPress = () => {
		router.push("/Home");
		setIsVisible(false);
	};

	return (
		<>
			<View className="bg-background flex-1"></View>
			<Modal visible={isVisible} animationType="fade">
				<View className="flex-row justify-between items-center p-2 absolute z-10 w-full">
					<TouchableOpacity
						onPress={handleBackPress}
						className="p-2  bg-background rounded-full"
					>
						<Ionicons name="arrow-back" size={24} color="#00ffb2" />
					</TouchableOpacity>
					<View className="flex-col items-center justify-center bg-background/70 rounded-lg px-2 py-1">
						<Text className="text-right text-text font-bold">
							{userData && userData.name}
						</Text>
						<Text className="text-right text-secondText font-semibold">
							{userData && userData.email}
						</Text>
					</View>
				</View>
				<View className="h-screen w-screen">
					<WebView
						className="flex-1"
						source={{
							uri: "https://medium.com/@peninangizwenayo/screen-orientation-in-react-native-expo-765ac5248f6d",
						}}
					/>
				</View>
			</Modal>
		</>
	);
};

export default Control;
