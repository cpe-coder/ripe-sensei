import { useNavigation } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import React from "react";
import { Text, View } from "react-native";

const Control = () => {
	const navigation = useNavigation();

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
		<View className="flex-1 bg-background items-center justify-center">
			<Text className="text-text">Control</Text>
		</View>
	);
};

export default Control;
