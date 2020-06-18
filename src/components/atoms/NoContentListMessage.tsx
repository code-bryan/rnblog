import React from 'react';
import { Icon, NativeBase } from 'native-base';
import styled from 'styled-components/native';

const Container: React.FC<NativeBase.View> = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;
const Label: React.FC<NativeBase.Text> = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
const IconWarning: React.FC<NativeBase.Icon> = styled(Icon)`
  color: #f1c40f;
  font-size: 42px;
`;

const NoContentListMessage: React.FC = (props) => (
  <Container>
    <IconWarning name="ios-warning" />
    <Label>{props.children}</Label>
  </Container>
);

export default NoContentListMessage;
