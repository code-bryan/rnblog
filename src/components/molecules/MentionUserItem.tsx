import React, { useCallback } from 'react';
import { NativeBase, Text, Thumbnail } from 'native-base';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import UserMention from '../../models/UserMention';
import CircleImage from '../atoms/images/CircleImage';
import ItemImage from "../atoms/images/ItemImage";

interface Props {
  user: UserMention,
  onUserTap: Function,
}

const Container = styled(TouchableOpacity)`
   flex: 1;
   height: 40px;
   width: 100%;
   margin-top: 2px;
   margin-bottom: 2px;
   flex-direction: row;
   justify-content: center;
   align-items: center;
`;

const TextStyled: React.FC<NativeBase.Text> = styled(Text)`
  flex: 1;
  width: 100%;
  color: #797979;
  padding-left: 10px;
  font-weight: bold;
`;

const MentionUserItem: React.FC<Props> = (props) => {
  const { user, onUserTap } = props;

  const onPressHandler = useCallback(() => {
    onUserTap(user.name);
  }, [user, onUserTap]);

  return (
    <Container onPress={onPressHandler}>
      <Thumbnail source={{ uri: user.image }} square />
      <TextStyled>{user.name}</TextStyled>
    </Container>
  );
};

export default MentionUserItem;
