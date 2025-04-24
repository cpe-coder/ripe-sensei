import { icon } from "@/constant/icon";
import { useAuth } from "@/context/auth-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { Image, Modal, Pressable, Text, View } from "react-native";

const Settings = () => {
	const [visible, setVisible] = React.useState(false);
	const { userImage, userData } = useAuth();
	return (
		<View className="flex items-center justify-end">
			<Pressable onPress={() => setVisible((prev) => !prev)}>
				<Ionicons name="settings" size={24} color="white" />
			</Pressable>

			<Modal
				transparent
				visible={visible}
				onRequestClose={() => setVisible(false)}
				animationType="fade"
			>
				<View className=" bg-background w-screen h-screen">
					<View className="flex p-4 flex-row gap-2 items-center justify-start">
						<Pressable onPress={() => setVisible(false)} className=" mr-5">
							<ArrowLeft />
						</Pressable>
						<Text className="text-text font-bold text-xl">Settings</Text>
					</View>
					<View className="flex w-full justify-center items-center pt-5">
						<Image
							source={!userImage ? icon.user : { uri: userImage.image }}
							className="w-28 h-28 rounded-full"
						/>

						<Text className="text-text py-5 font-bold text-2xl">
							{userData ? userData?.name : "Ripe Sensei"}
						</Text>
					</View>
					<View className="py-2">
						<Pressable
							onPress={() => console.log("clicked")}
							className="flex-row px-4 py-2 justify-start items-center gap-5 active:bg-gray-300/20 transition-all duration-300 active:transition-all active:duration-300"
						>
							<View className="bg-red-500 rounded-full p-3">
								<MaterialIcons name="alternate-email" size={24} color="white" />
							</View>
							<View>
								<Text className=" text-lg text-text">Email</Text>
								<Text className="text-secondText text-xs">
									{userData?.email}
								</Text>
							</View>
						</Pressable>
					</View>
				</View>
			</Modal>
		</View>
	);
};

export default Settings;
