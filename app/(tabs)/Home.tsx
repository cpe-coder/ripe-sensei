import { Records } from "@/components";
import { images } from "@/constant/images";
import React from "react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	SafeAreaView,
	Text,
	View,
} from "react-native";

const Home = () => {
	const [isChecking, setIsChecking] = React.useState(false);
	const [isLoadingMore, setIsLoadingMore] = React.useState(false);
	const [records, setRecords] = React.useState([
		{ id: 1, ripe: "60%", raw: "50%", date: "April 2, 2025 7:58 AM" },
		{ id: 2, ripe: "60%", raw: "50%", date: "April 2, 2025 7:58 AM" },
		{ id: 3, ripe: "60%", raw: "50%", date: "April 2, 2025 7:58 AM" },
		{ id: 4, ripe: "60%", raw: "50%", date: "April 2, 2025 7:58 AM" },
		{ id: 5, ripe: "60%", raw: "50%", date: "April 2, 2025 7:58 AM" },
	]);
	return (
		<>
			<SafeAreaView className="flex-1 bg-background">
				<View className="px-4 py-4">
					<Text className="text-5xl text-primary italic font-bold text-center">
						RIPE SENSEI
					</Text>
				</View>

				<Records
					rendered={
						<FlatList
							className="h-screen px-4"
							scrollEnabled={true}
							data={records}
							keyExtractor={(item, index) => `${item.id}-${index}`}
							renderItem={({ item }) => (
								<View className="flex-col mt-4 px-4 py-4 bg-[#002b2e] gap-2 rounded-lg">
									<Text className="text-xl font-bold text-text mt-1">
										{item.date}
									</Text>
									<View className="flex-row justify-between items-center">
										<Text className="text-lg font-semibold text-secondary">
											Ripe: {item.ripe}
										</Text>
										<Text className="text-lg font-semibold text-primary">
											Raw: {item.raw}
										</Text>
									</View>
								</View>
							)}
							onEndReachedThreshold={0.5}
							ListFooterComponent={
								isLoadingMore ? (
									<View className="py-4">
										<ActivityIndicator size="large" color="#00ffb2" />
									</View>
								) : null
							}
							ListEmptyComponent={() =>
								isChecking ? (
									<View className="">
										<Text className="text-gray-500 mt-4 text-lg">
											Loading data...
										</Text>
										<View className="p-6 items-center justify-center">
											<ActivityIndicator size="large" color="#00ffb2" />
										</View>
									</View>
								) : (
									<View className="">
										<Text className="text-gray-500 mt-4 text-lg">
											Empty records
										</Text>
										<View className="p-6 items-center justify-center">
											<Image
												className="w-28 h-28"
												resizeMode="contain"
												source={images.Empty}
											/>
										</View>
									</View>
								)
							}
						/>
					}
				/>
			</SafeAreaView>
		</>
	);
};

export default Home;
