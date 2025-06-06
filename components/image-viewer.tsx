import React from "react";
import { Image } from "react-native";

const ImageViewer = () => {
	const [tick, setTick] = React.useState(0);

	React.useEffect(() => {
		const interval = setInterval(() => {
			setTick((prev) => (prev + 1) % 1000);
		}, 500);

		return () => clearInterval(interval);
	}, []);

	const uri = `http://192.168.43.191/1280x720.jpg?${tick}`;
	const key = tick % 2;

	return (
		<Image
			key={key}
			source={{ uri }}
			style={{ width: "100%", height: "100%" }}
			resizeMode="cover"
		/>
	);
};

export default ImageViewer;
