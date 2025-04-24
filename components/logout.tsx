import { useAuth } from "@/context/auth-context";
import React from "react";
import { Pressable, Text } from "react-native";

const Logout = () => {
	const { onLogout } = useAuth();
	return (
		<Pressable
			onPress={onLogout}
			className="active:bg-gray-200/20 focus:bg-gray-200/30 mb-4 p-4 "
		>
			<Text className="text-center text-white">Logout</Text>
		</Pressable>
	);
};

export default Logout;
