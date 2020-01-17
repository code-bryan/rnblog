import React from 'react';
import { Radio, View } from 'native-base';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import MutedText from '../../atoms/text/MutedText';

interface Props {
  onPress?: Function;
  selected: boolean;
  disabled?: boolean;
}

const Touchable = styled(TouchableOpacity)`
  flex-direction: row;
  margin: 2.5px 7px;
  align-content: flex-start;
  justify-content: space-between;
`;

const Content = styled(View)`
  margin-right: 5px;
  margin-bottom: 10px;
  margin-top: 10px;
  border-bottom-width: 1.27px;
  border-bottom-color: #dbdbdb;
  padding-bottom: 10px;
`;

const FieldRadio: React.FC<Props> = (props) => (
  <Content>
    <Touchable activeOpacity={0.6} disabled={props.disabled} onPress={props.onPress}>
      <MutedText noMargin>{props.children}</MutedText>
      <Radio
        selected={props.selected}
        onPress={props.onPress}
        disabled={props.disabled}
        selectedColor="#000"
        activeOpacity={0.6}
      />
    </Touchable>
  </Content>
);

export default FieldRadio;
