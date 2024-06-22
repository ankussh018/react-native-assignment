import React from "react";
import { View, Image, ImageStyle, ImageSourcePropType, ViewStyle } from "react-native";

interface ImageViewProps {
  image: ImageSourcePropType;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  width?: number;
  height?: number;
  flex?: number;
  radius?: number;
  alignSelf?: ViewStyle['alignSelf'];
  alignItems?: ViewStyle['alignItems'];
  position?: ViewStyle['position'];
  right?: number;
  bottom?: number;
  resizeMode?: ImageStyle['resizeMode'];
  tintColor?: string;
  bgColor?: string;
}

const ImageView: React.FC<ImageViewProps> = (props) => {
  return (
    <View>
      <Image
        style={{
          marginLeft: props.marginLeft,
          marginRight: props.marginRight,
          marginTop: props.marginTop,
          marginBottom: props.marginBottom,
          marginVertical: props.marginVertical,
          marginHorizontal: props.marginHorizontal,
          width: props.width,
          height: props.height,
          flex: props.flex,
          borderRadius: props.radius,
          alignSelf: props.alignSelf,
          alignItems: props.alignItems,
          position: props.position,
          right: props.right,
          bottom: props.bottom,
          resizeMode: props.resizeMode || 'cover',
          tintColor: props.tintColor,
          backgroundColor: props.bgColor,
        }}
        source={props.image}
      />
    </View>
  );
};

export default ImageView;
