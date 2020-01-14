import React from 'react';
import {
  Icon, NativeBase,
} from 'native-base';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

interface IconProps extends NativeBase.Icon {
  hasLike: boolean
}

interface Props {
  likes: number;
  onPress: Function;
  active: boolean;
}

const Container: React.FC<NativeBase.View> = styled.View`
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: row;
`;

const LikesText: React.FC<NativeBase.Text> = styled.Text`
  font-size: 16px;
  font-weight: 500;
  margin-left: 8px;
`;

const LikesIcon: React.FC<IconProps> = styled(Icon)`
  color: ${(props: IconProps) => (props.hasLike ? '#e74c3c' : '#ccc')};
`;

const LikesButton: React.FC<Props> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { likes, onPress, active } = props;

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <Container>
        <LikesIcon name="md-heart" type="Ionicons" hasLike={active} />
        <LikesText>{likes}</LikesText>
      </Container>
    </TouchableOpacity>
  );
};

export default LikesButton;
