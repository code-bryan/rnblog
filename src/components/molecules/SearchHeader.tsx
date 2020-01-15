import { Platform, TouchableOpacity, View } from 'react-native';
import { Icon, NativeBase } from 'native-base';
import React from 'react';
import styled from 'styled-components/native';
import Title from '../atoms/text/Title';

const HeaderContainer: React.FC<NativeBase.View> = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const SearchHeader: React.FC = (props) => (
  <HeaderContainer>
    <Title>{props.children}</Title>
    <TouchableOpacity activeOpacity={0.6}>
      <Icon type="Ionicons" fontSize={20} name={Platform.OS === 'android' ? 'md-search' : 'ios-search'} />
    </TouchableOpacity>
  </HeaderContainer>
);

export default SearchHeader;
