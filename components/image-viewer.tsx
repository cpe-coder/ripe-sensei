import React from "react";
import { WebView } from "react-native-webview";

const ImageViewer = () => {
	const streamUrl = "http://192.168.43.191/1280x720.mjpeg";

	return (
		<WebView
			source={{ uri: streamUrl }}
			allowsInlineMediaPlayback
			javaScriptEnabled
			domStorageEnabled
			mediaPlaybackRequiresUserAction={false}
			className="w-full h-full"
		/>
	);
};

export default ImageViewer;
