import { images } from "@/constant/images";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";

export default function Welcome() {
	const router = useRouter();
	const [isReading, setIsReading] = React.useState(false);

	const { checkingAuth } = useAuth();

	React.useEffect(() => {
		setIsReading(true);
		if (checkingAuth?.done) {
			router.push("/Home");
			return;
		}
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
			{isReading && (
				<View className="absolute bottom-16">
					<ActivityIndicator size="large" color="#ffffff" />
				</View>
			)}
		</View>
	);
}
