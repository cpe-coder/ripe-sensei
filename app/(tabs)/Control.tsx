import { icon } from "@/constant/icon";
import { useAuth } from "@/context/auth-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import React from "react";
import {
	Image,
	Modal,
	PanResponder,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import { WebView } from "react-native-webview";

const SLIDER_HEIGHT = 150;
const MIN_VALUE = 1000;
const MAX_VALUE = 2000;
const MID_VALUE = 1500;

const Control = () => {
	const navigation = useNavigation();
	const [isVisible, setIsVisible] = React.useState(false);
	const router = useRouter();
	const { userData } = useAuth();
	const [value, setValue] = React.useState(MID_VALUE);
	const [position, setPosition] = React.useState(SLIDER_HEIGHT / 2);

	const ripeValue = "80%";
	const rawValue = "20%";

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

	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onMoveShouldSetPanResponder: () => true,
		onPanResponderMove: (_, gestureState) => {
			let newY = position + gestureState.dy * -1;
			newY = Math.max(0, Math.min(SLIDER_HEIGHT, newY));
			setPosition(newY);

			const newValue = Math.round(
				MIN_VALUE + (newY / SLIDER_HEIGHT) * (MAX_VALUE - MIN_VALUE)
			);
			setValue(newValue);
		},
		onPanResponderGrant: () => {},
		onPanResponderRelease: () => {},
	});

	const handleReset = () => {
		setValue(MID_VALUE);
		setPosition(SLIDER_HEIGHT / 2);
	 };

	return (
		<>
			<View className="bg-background flex-1"></View>
			<Modal visible={isVisible} animationType="fade">
				<View className="flex-row justify-between items-start p-2 absolute z-10 w-full">
					<TouchableOpacity
						onPress={handleBackPress}
						className="p-2  bg-background rounded-full"
					>
						<Ionicons name="arrow-back" size={24} color="#00ffb2" />
					</TouchableOpacity>
					<View className="flex-col items-start gap-1 justify-center bg-background/70 rounded-lg px-4 py-2">
						<View className="flex-row gap-2 items-center">
							<Image
								source={icon.ripe}
								height={0}
								width={0}
								className="h-7 w-7"
							/>
							<Text className="text-primary font-bold">{ripeValue}</Text>
						</View>
						<View className="flex-row gap-2 items-center">
							<Image
								source={icon.raw}
								height={0}
								width={0}
								className="h-7 w-7"
							/>
							<Text className="text-primary font-bold">{rawValue}</Text>
						</View>
					</View>
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
				<View className="flex-row justify-between items-end p-6 absolute z-10 w-full bottom-0">
					<Image
						source={icon.steeringWheel}
						height={0}
						width={0}
						className="w-40 h-40"
					/>
					<View className="bg-background/70 rounded-lg px-4 py-2">
						<Text className="text-lg text-primary font-semibold">
							Power: {value}
						</Text>
						<View>
							<TouchableOpacity onPress={handleReset}>
								<Text className="text-primary shadow-green-300 font-bold text-lg">N</Text>
							</TouchableOpacity>
						</View>
					<View className="relative items-center justify-center h-[150px] w-16 bg-background rounded-full overflow-hidden">
						<View
							className="absolute w-2 bg-primary rounded-full h-full"
							{...panResponder.panHandlers}
						>
							<View
								className="absolute w-8 h-8 bg-secondary rounded-full -left-3"
								style={{ bottom: position - 10 }}
							/>
						</View>
					</View>
				</View>
			</Modal>
		</>
	);
};

export default Control;
