import { icon } from "@/constant/icon";
import { images } from "@/constant/images";
import { useAuth } from "@/context/auth-context";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

const HeaderTitle = () => {
	const { userData } = useAuth();
	return (
		<View className="flex-row gap-4 justify-center py-4 items-center">
			<Image resizeMode="contain" className="w-10 h-10" source={images.Logo} />
			<Text className="text-2xl font-bold text-left text-white">
				{userData ? userData.name : "Ripe Sensei"}
			</Text>
		</View>
	);
};

const HeaderRight = () => {
	const navigation = useNavigation();

	return (
		<View className="flex-row justify-start py-4 px-4">
			<View className="rounded-full">
				<Pressable
					onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
					className="text-white rounded-full bg-gray-800"
				>
					<Image
						source={icon.user}
						alt="avaltar"
						className="w-11 h-11 rounded-full"
					/>
				</Pressable>
			</View>
		</View>
	);
};

export default { HeaderTitle, HeaderRight };
