import styled from 'styled-components';
import Colors from '../../../constants/Colors';
import React from "react";
import { Platform, TouchableNativeFeedback, TouchableOpacity } from "react-native";

interface Props {
  onTap: Function
}

const LinkStyle = styled.Text`
  color: ${Colors.primary};
  font-size: 18px;
`;

const Link: React.FC<Props> = (props: Props) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= '21') {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <TouchableComponent></TouchableComponent>
  );
};

export default Link;
