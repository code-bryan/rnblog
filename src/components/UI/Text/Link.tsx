import styled from 'styled-components';
import React from 'react';
import {
  Platform, View, TouchableNativeFeedback, TouchableOpacity,
} from 'react-native';
import Colors from '../../../constants/Colors';

interface Props {
  onPress: Function,
  style: object
}

const LinkText = styled.Text`
  color: ${Colors.primary};
  font-size: 18px;
`;

const LinkContainer = styled.View`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Link: React.FC<Props> = (props) => {
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
