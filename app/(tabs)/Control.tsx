import { ImageViewer } from "@/components";
import { icon } from "@/constant/icon";
import { useAuth } from "@/context/auth-context";
import database from "@/utils/firebase.config";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { onValue, ref, set } from "firebase/database";
import React from "react";
import {
	Animated,
	Image,
	Modal,
	PanResponder,
	Text,
	TouchableOpacity,
	View,
	ViewProps,
} from "react-native";

const SLIDER_HEIGHT = 100;
const MIN_VALUE = 1000;
const MAX_VALUE = 2000;
const MID_VALUE = 1500;

function Trootle(props: {
	power:
		| string
		| number
		| bigint
		| boolean
		| React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
		| Iterable<React.ReactNode>
		| React.ReactPortal
		| Promise<
				| string
				| number
				| bigint
				| boolean
				| React.ReactPortal
				| React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
				| Iterable<React.ReactNode>
				| null
				| undefined
		  >
		| null
		| undefined;
	panHandlers: React.JSX.IntrinsicAttributes &
		React.JSX.IntrinsicClassAttributes<View> &
		Readonly<ViewProps>;
	position: number;
}) {
	return (
		<View className="bg-background/70 items-center justify-center py-2 rounded-lg px-4 mx-6">
			<Text className="text-lg text-primary font-semibold mb-2">
				Power: {props.power}
			</Text>

			<View className="relative items-center justify-center h-[150px] w-16 bg-background rounded-lg overflow-hidden">
				<View
					className="absolute w-6 rounded-md h-[100px] my-4"
					{...props.panHandlers}
				>
					<View
						className="absolute w-12 h-8 bg-secondary rounded-md -left-3"
						style={{
							bottom: props.position - 10,
						}}
					/>
				</View>
			</View>
		</View>
	);
}

function UserInfo(props: { userData: { name: any; email: any } }) {
	return (
		<View className="flex-col items-start justify-center bg-background/70 rounded-lg px-2 mx-6 py-1">
			<Text className="text-left text-text font-bold">
				{props.userData && props.userData.name}
			</Text>
			<Text className="text-left text-secondText font-semibold">
				{props.userData && props.userData.email}
			</Text>
		</View>
	);
}

export default function Control() {
	const navigation = useNavigation();
	const [isVisible, setIsVisible] = React.useState(false);
	const router = useRouter();
	const { userData } = useAuth();
	const [power, setPower] = React.useState(MID_VALUE);
	const [position, setPosition] = React.useState(SLIDER_HEIGHT / 2);
	const rotation = React.useRef(new Animated.Value(90)).current;
	const [wheelDegree, setWheelDegree] = React.useState(90);
	const [ripeCount, setRipeCount] = React.useState(0);
	const [rawCount, setRawCount] = React.useState(0);
	const [disable, setDisable] = React.useState(false);

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

	// eslint-disable-next-line react-hooks/exhaustive-deps
	React.useEffect(() => {
		if (rawCount === 0 || ripeCount === 0) {
			setDisable(true);
		} else {
			setDisable(false);
		}

		console.log("Wheel: ", rotation);
		console.log("Wheel: ", wheelDegree);
		getRawCount();
		getRipeCount();
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

	const setActivePower = async () => {
		try {
			const valueRef = ref(database, "Controls/esc");
			await set(valueRef, power);
		} catch (error) {
			console.log("Error setting power value:", error);
		}
	};

	const handleReset = () => {
		setPower(MID_VALUE);
		setPosition(SLIDER_HEIGHT / 2);
	};

	const setActiveWheel = async () => {
		try {
			const valueRef = ref(database, "Controls/wheel");
			await set(valueRef, wheelDegree);
		} catch (error) {
			console.log("Error setting wheel value:", error);
		}
	};

	const handleLeft = () => {
		setWheelDegree((prev) => Math.max(0, prev - 10));
	};

	const handleRight = () => {
		setWheelDegree((prev) => Math.min(180, prev + 10));
	};

	const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

	const startAutoAdjust = (direction: "left" | "right") => {
		stopAutoAdjust();
		intervalRef.current = setInterval(() => {
			setWheelDegree((prev) => {
				const next = direction === "left" ? prev - 1 : prev + 1;
				if (next < 0 || next > 180) {
					stopAutoAdjust();
					return prev;
				}
				return next;
			});
		}, 100);
	};

	const stopAutoAdjust = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	const handleResetWheel = () => {
		setWheelDegree(90);
	};

	const getRawCount = async () => {
		const valueRef = ref(database, "detection/raw");

		const subscribe = await onValue(valueRef, (snapshot) => {
			const value = snapshot.val();
			setRawCount(value);
		});
		return () => subscribe();
	};
	const getRipeCount = async () => {
		const valueRef = ref(database, "detection/ripe");

		const subscribe = await onValue(valueRef, (snapshot) => {
			const value = snapshot.val();
			setRipeCount(value);
		});
		return () => subscribe();
	};

	const total = rawCount + ripeCount;

	const ripePercentage = total > 0 ? (ripeCount / total) * 100 : 0;
	const rawPercentage = total > 0 ? (rawCount / total) * 100 : 0;

	return (
		<>
			<View className="bg-background h-screen w-screen"></View>
			<Modal visible={isVisible} animationType="fade">
				<View className="flex-row justify-between items-start px-6 py-2 absolute z-10 w-full">
					<TouchableOpacity
						onPress={handleBackPress}
						className="p-2  bg-background/70 rounded-full"
					>
						<Ionicons name="arrow-back" size={24} color="#00ffb2" />
					</TouchableOpacity>
					<View className="flex-row gap-2 items-center">
						<View className="flex-col items-start gap-1 justify-center bg-background/70 rounded-lg px-4 py-2">
							<View className="flex-row gap-2 items-center">
								<Image
									source={icon.ripe}
									height={0}
									width={0}
									className="h-7 w-7"
								/>
								<Text className="text-primary font-bold">
									{ripePercentage.toFixed(0)} %
								</Text>
							</View>
							<View className="flex-row gap-2 items-center">
								<Image
									source={icon.raw}
									height={0}
									width={0}
									className="h-7 w-7"
								/>
								<Text className="text-primary font-bold">
									{rawPercentage.toFixed(0)} %
								</Text>
							</View>
						</View>
						<View>
							<TouchableOpacity
								disabled={disable}
								className={` p-2 rounded-md ${
									disable ? "bg-background/70" : "bg-green-500"
								}`}
							>
								<Text className="text-white">Save</Text>
							</TouchableOpacity>
						</View>
					</View>

					{userData && (
						<UserInfo
							userData={{ name: userData.name, email: userData.email }}
						/>
					)}
				</View>
				<View className="h-screen w-screen bg-slate-900">
					<ImageViewer />
				</View>
				<View className="flex-row justify-between items-end p-6 absolute z-10 w-full bottom-0">
					<View className="flex-row gap-2 items-center">
						<TouchableOpacity
							onPressIn={() => startAutoAdjust("left")}
							onPressOut={stopAutoAdjust}
							onPress={handleLeft}
							className="bg-slate-500 rounded-full p-4"
						>
							<Ionicons name="arrow-back" size={24} color="white" />
						</TouchableOpacity>

						<TouchableOpacity
							onPress={handleResetWheel}
							className="bg-green-500 h-10 w-10  rounded-full "
						></TouchableOpacity>

						<TouchableOpacity
							onPressIn={() => startAutoAdjust("right")}
							onPressOut={stopAutoAdjust}
							onPress={handleRight}
							className="bg-slate-500 rounded-full p-4"
						>
							<Ionicons name="arrow-forward" size={24} color="white" />
						</TouchableOpacity>
					</View>
					<View className="flex justify-end right-0">
						<TouchableOpacity
							className="bg-background/70 rounded-md px-3 py-2"
							onPress={handleReset}
						>
							<Text className="font-bold text-xl text-primary">N</Text>
						</TouchableOpacity>
					</View>
					<Trootle
						power={power}
						position={position}
						panHandlers={panResponder.panHandlers}
					></Trootle>
				</View>
			</Modal>
		</>
	);
}
