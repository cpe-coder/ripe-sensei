import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import React from "react";
import { Modal, Pressable } from "react-native";
import { WebView } from "react-native-webview";

const Control = () => {
	const navigation = useNavigation();
	const [isVisible, setIsVisible] = React.useState(false);

	React.useEffect(() => {
		setIsVisible(true);
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
		<Modal
			transparent
			visible={isVisible}
			onRequestClose={() => setIsVisible(false)}
			animationType="fade"
			className="flex-1"
		>
			<Pressable
				onPress={() => setIsVisible(false)}
				className=" mr-5 p-2 absolute z-10 left-0 top-0"
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
	);
};

export default Control;
