import styled from 'styled-components/native';
import React from 'react';
import {
  Platform, TouchableNativeFeedback, TouchableOpacity,
} from 'react-native';
import { NativeBase } from 'native-base';
import Colors from '../../../constants/Colors';

const LinkText = styled.Text`
  color: ${Colors.primary};
  font-size: 18px;
`;

const LinkContainer: NativeBase.View = styled.View`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Link: React.FC<NativeBase.Text> = (props) => {
  let TouchableComponent: any = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= '21') {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <TouchableComponent onPress={props.onPress}>
      <LinkContainer style={props.style}>
        <LinkText>{props.children}</LinkText>
      </LinkContainer>
    </TouchableComponent>
  );
};

export default Link;
