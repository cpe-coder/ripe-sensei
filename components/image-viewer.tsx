import React from "react";
import { WebView } from "react-native-webview";

const ImageViewer = () => {
	return (
		<WebView
			source={{ uri: "http://192.168.43.191/1280x720.mjpeg" }}
			originWhitelist={["*"]}
			mixedContentMode="always"
			javaScriptEnabled
			domStorageEnabled
			allowsInlineMediaPlayback
		/>
	);
};

export default ImageViewer;
