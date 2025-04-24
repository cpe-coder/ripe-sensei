import { icon } from "@/constant/icon";
import { useAuth } from "@/context/auth-context";
import React from "react";
import { Image, Text, View } from "react-native";

const ProfileInfo = () => {
	const { userData, userImage } = useAuth();

	return (
		<View className=" flex-row justify-start px-4 items-center gap-3">
			<Image
				source={!userImage ? icon.user : { uri: userImage.image }}
				alt="avaltar"
				className="w-11 h-11 rounded-full"
			/>
			<View className="flex flex-col">
				<Text className="text-white font-bold">
					{!userData ? "Multi care user" : userData?.name}
				</Text>
			</View>
		</View>
	);
};

export default ProfileInfo;
