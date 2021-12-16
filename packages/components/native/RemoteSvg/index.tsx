import React from "react";
import { StyleSheet, Image } from "react-native";
import { SvgBase } from "./SvgBase";
import { Props } from "./util";

const SvgImage: React.FC<Props> = (props) => {
  const source = Image.resolveAssetSource(props.source);
  if (source.uri.match(".svg")) {
    const style = StyleSheet.flatten(props.style);
    if (typeof style !== "number") {
      if (!style.width) {
        style.width = source.width;
      }
      if (!style.height) {
        style.height = source.height;
      }
    }
    return <SvgBase {...props} source={source} style={style} />;
  } else {
    return <Image {...props} />;
  }
};

export default SvgImage;
