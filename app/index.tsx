import { images } from "@/constant/images";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";

export default function Welcome() {
	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			router.push("/Home");
		}, 2000);
	});
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
