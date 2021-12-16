import React, { useState, useEffect, useCallback } from "react";
import { SvgProps, container } from "./util";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export const SvgBase: React.FC<SvgProps> = (props) => {
  const [html, setHtml] = useState("");
  const [svgData, setSvgData] = useState("");
  const getImage = useCallback(async () => {
    const uri = props.source.uri;
    if (uri) {
      if (uri.match(/^data:image\/svg/)) {
        const i = uri.indexOf("<svg");
        setSvgData(uri.slice(i));
      } else {
        try {
          const res = await fetch(uri);
          const raw = await res.text();
          setSvgData(raw);
        } catch (err) {
          console.error("Something Went Wrong!", err);
        }
      }
    }
  }, [props.source]);

  useEffect(() => {
    const flattenedStyle = StyleSheet.flatten(props.style);
    (async () => {
      await getImage();
      setHtml(container(svgData, flattenedStyle));
    })();
  }, [props.style, getImage, svgData]);

  return (
    <View pointerEvents="none" style={[props.style, props.containerStyle]}>
      <WebView
        originWhitelist={["*"]}
        scalesPageToFit={true}
        useWebKit={false}
        style={[
          {
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
          },
          props.style,
        ]}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        source={{ html }}
      />
    </View>
  );
};
