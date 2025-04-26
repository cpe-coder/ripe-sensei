import * as ScreenOrientation from "expo-screen-orientation";
import React from "react";
import { Text, View } from "react-native";

const Control = () => {
	React.useEffect(() => {
		const unlockScreenOerientation = async () => {
			await ScreenOrientation.lockAsync(
				ScreenOrientation.OrientationLock.LANDSCAPE
			);
		};
		unlockScreenOerientation();
	}, []);
	return (
		<View className="flex-1 bg-background items-center justify-center">
			<Text className="text-text">Control</Text>
		</View>
	);
};

export default Control;
