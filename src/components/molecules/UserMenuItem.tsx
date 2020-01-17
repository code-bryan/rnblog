import React from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { View } from 'native-base';
import { TouchableOpacity } from 'react-native';
import User from '../../models/User';
import CircleImage from '../atoms/images/CircleImage';
import MutedText from '../atoms/text/MutedText';

interface Props {
  onPress: Function
}

const StyledMenuContent = styled(View)`
  padding-top: 25px;
  border-bottom-color: #ccc;
  border-bottom-width: 1px;
  padding-bottom: 15px;
  width: 70%;
  flex-direction: row;
  margin: 10px 40px;
  align-items: center;
  justify-content: flex-start;
`;

const UserInfoContainer = styled(View)`
   margin-left: 10px;
`;

const UserMenuItem: React.FC<Props> = (props) => {
  const user: User = useSelector((state: any) => state.auth.user);

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <StyledMenuContent>
        <CircleImage source={{ uri: user.avatar }} width={50} height={50} />
        <UserInfoContainer>
          <MutedText noMargin bold>
            {user.name}
            {' '}
            {user.lastname}
          </MutedText>
        </UserInfoContainer>
      </StyledMenuContent>
    </TouchableOpacity>
  );
};

export default UserMenuItem;
