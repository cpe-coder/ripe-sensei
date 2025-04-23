import { useAuth } from "@/context/auth-context";
import { Redirect } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const TabsLayout = () => {
	const { authState } = useAuth();
	const [isAuthenticated, setIsAthenticated] = React.useState(false);

	React.useEffect(() => {
		if (!authState?.authenticated) {
			setIsAthenticated(true);
			return;
		}
		setIsAthenticated(false);
		return;
	});

	if (isAuthenticated) {
		return <Redirect href={"/sign-in"} />;
	}

	return (
		<View>
			<Text>TabsLayout</Text>
		</View>
	);
};

export default TabsLayout;
