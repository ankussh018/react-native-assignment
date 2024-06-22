import React from "react";
import { Text, TextStyle } from "react-native";

interface CustomTextProps {
  text: string;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  color?: string;
  textAlign?: TextStyle['textAlign'];
  fontFamily?: string;
  textDecorationLine?: TextStyle['textDecorationLine'];
  lineHeight?: number;
  letterSpacing?: number;
  fontStyle?: TextStyle['fontStyle'];
  textTransform?: TextStyle['textTransform'];
  textAlignVertical?: TextStyle['textAlignVertical'];
}

const CustomText: React.FC<CustomTextProps> = (props) => {
  return (
    <Text
      style={{
        marginLeft: props.marginLeft,
        marginRight: props.marginRight,
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
        marginVertical: props.marginVertical,
        marginHorizontal: props.marginHorizontal,
        fontSize: props.fontSize || 16, // Default fontSize to 16 if not provided
        fontWeight: props.fontWeight || 'normal', // Default fontWeight to 'normal'
        color: props.color || 'black', // Default color to black if not provided
        textAlign: props.textAlign,
        fontFamily: props.fontFamily,
        textDecorationLine: props.textDecorationLine,
        lineHeight: props.lineHeight,
        letterSpacing: props.letterSpacing,
        fontStyle: props.fontStyle,
        textTransform: props.textTransform,
        textAlignVertical: props.textAlignVertical,
      }}
    >
      {props.text}
    </Text>
  );
};

export default CustomText;
