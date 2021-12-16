import {
  ViewStyle,
  StyleProp,
  ImageStyle,
  ImageSourcePropType,
  ImageResolvedAssetSource,
} from "react-native";

export interface SvgProps {
  style: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  source: ImageResolvedAssetSource;
}
export interface Props {
  source: ImageSourcePropType;
  style: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export const container = (svgData: string, style: ViewStyle) => `
<html data-key="key-${style.height}-${style.width}">
  <head>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
        background-color: transparent;
      }
      svg {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    ${svgData}
  </body>
</html>
`;
