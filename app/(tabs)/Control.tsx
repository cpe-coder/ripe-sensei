import { icon } from "@/constant/icon";
import { useAuth } from "@/context/auth-context";
import database from "@/utils/firebase.config";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { ref, set } from "firebase/database";
import React from "react";
import {
	Animated,
	Image,
	Modal,
	PanResponder,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { WebView } from "react-native-webview";

const SLIDER_HEIGHT = 100;
const MIN_VALUE = 1000;
const MAX_VALUE = 2000;
const MID_VALUE = 1500;

const Control = () => {
	const navigation = useNavigation();
	const [isVisible, setIsVisible] = React.useState(false);
	const router = useRouter();
	const { userData } = useAuth();
	const [power, setPower] = React.useState(MID_VALUE);
	const [position, setPosition] = React.useState(SLIDER_HEIGHT / 2);
	const rotation = React.useRef(new Animated.Value(90)).current;
	const [wheelDegree, setWheelDegree] = React.useState<number>(90);

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

	React.useEffect(() => {
		console.log("Wheel: ", rotation);
		console.log("Wheel: ", wheelDegree);
		setActivePower();
		setActiveWheel();
	});

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
			setPower(newValue);
		},
		onPanResponderGrant: () => {},
		onPanResponderRelease: () => {},
	});

	const steeringWheelResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onMoveShouldSetPanResponder: () => true,
		onPanResponderMove: (_, gestureState) => {
			const { dx } = gestureState;

			let newRotation = Math.round(Math.max(0, Math.min(180, 90 + dx * 0.2)));

			setWheelDegree(newRotation);
			console.log("kljahsdklfhj", rotation.setValue(newRotation));
			rotation.setValue(newRotation);
		},
		onPanResponderRelease: () => {
			Animated.timing(rotation, {
				toValue: 90,
				duration: 200,
				useNativeDriver: false,
			}).start();
		},
	});

	const setActivePower = async () => {
		try {
			const valueRef = ref(database, "Controls/esc");
			await set(valueRef, power);
		} catch (error) {
			console.log("Error setting power value:", error);
		}
	};
	const setActiveWheel = async () => {
		try {
			const valueRef = ref(database, "Controls/wheel");
			await set(valueRef, wheelDegree);
		} catch (error) {
			console.log("Error setting wheel value:", error);
		}
	};

	const handleReset = () => {
		setPower(MID_VALUE);
		setPosition(SLIDER_HEIGHT / 2);
	};

	return (
		<>
			<View className="bg-background h-screen w-screen"></View>
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
					<View className="flex-col items-start justify-center bg-background/70 rounded-lg px-2 py-1">
						<Text className="text-left text-text font-bold">
							{userData && userData.name}
						</Text>
						<Text className="text-left text-secondText font-semibold">
							{userData && userData.email}
						</Text>
					</View>
				</View>
				<View className="h-screen w-screen">
					<WebView
						className="flex-1 bg-white"
						source={{
							uri: "https://eos.com/wp-content/uploads/2023/10/indeterminate-tomato-field.jpg.webp",
						}}
					/>
				</View>
				<View className="flex-row justify-between items-end p-6 absolute z-10 w-full bottom-0">
					<View
						className="w-40 h-40 items-center justify-center -rotate-90"
						{...steeringWheelResponder.panHandlers}
					>
						<Animated.Image
							source={icon.steeringWheel}
							height={0}
							width={0}
							className="w-40 h-40"
							style={{
								transform: [
									{
										rotate: rotation.interpolate({
											inputRange: [0, 180],
											outputRange: ["0deg", "180deg"],
										}),
									},
								],
							}}
						/>
					</View>
					<View className="flex justify-end right-0">
						<TouchableOpacity
							className="bg-background/70 rounded-md px-3 py-2"
							onPress={handleReset}
						>
							<Text className="font-bold text-xl text-primary">N</Text>
						</TouchableOpacity>
					</View>
					<View className="bg-background/70 items-center justify-center py-2 rounded-lg px-4">
						<Text className="text-lg text-primary font-semibold mb-2">
							Power: {power}
						</Text>

						<View className="relative items-center justify-center h-[150px] w-16 bg-background rounded-lg overflow-hidden">
							<View
								className="absolute w-6 rounded-md h-[100px] my-4"
								{...panResponder.panHandlers}
							>
								<View
									className="absolute w-12 h-8 bg-secondary rounded-md -left-3"
									style={{ bottom: position - 10 }}
								/>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		</>
	);
};

export default Control;
