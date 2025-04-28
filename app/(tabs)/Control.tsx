import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import React from "react";
import { Modal, Pressable, View } from "react-native";
import { WebView } from "react-native-webview";

const Control = () => {
	const navigation = useNavigation();
	const [isVisible, setIsVisible] = React.useState(true);
	const router = useRouter();

	React.useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			try {
				ScreenOrientation.lockAsync(
					ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
				);
			} catch (error) {
				console.log(error);
			}
		});

		return unsubscribe;
	}, [navigation]);

	return (
		<View className="bg-background flex-1">
			<Modal
				transparent
				visible={isVisible}
				animationType="fade"
				className="flex-1"
			>
				<Pressable
					onPress={() => router.push("/Home")}
					className=" mr-5 p-2 absolute z-10 left-2 top-0 bg-background rounded-full"
				>
					<Ionicons name="arrow-back" size={24} color="#00ffb2" />
				</Pressable>
				<WebView
					className="flex-1"
					source={{
						uri: "https://medium.com/@peninangizwenayo/screen-orientation-in-react-native-expo-765ac5248f6d",
					}}
				/>
			</Modal>
		</View>
	);
};

export default Control;
