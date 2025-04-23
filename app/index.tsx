import { images } from "@/constant/images";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

export default function Index() {
	const { authState } = useAuth();
	const [loading, setLoading] = React.useState(false);

	const router = useRouter();
	if (!authState?.authenticated) {
		setLoading(true);
		setTimeout(() => {
			// router.push("/(auth)/sign-in");
			setLoading(false);
		}, 1500);
	}
	return (
		<View className="flex-1 items-center justify-center bg-background">
			<View className="flex flex-col gap-4 justify-center items-center">
				<Text className="text-center text-wrap font-bold text-2xl text-primary">
					Welcome to Ripe Sensei
				</Text>
				<Image
					className="w-[200px] h-[200px]"
					source={images.Logo}
					resizeMode="contain"
				/>
			</View>
		</View>
	);
}
