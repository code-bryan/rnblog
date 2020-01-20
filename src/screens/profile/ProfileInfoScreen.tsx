import React, { useEffect, useState } from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Content, Header, NativeBase, View,
} from 'native-base';
import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import User from '../../models/User';
import CircleImage from '../../components/atoms/images/CircleImage';
import ToastService from '../../services/ToastService';
import { cleanAuthError } from '../../store/modules/Authentication';
import MutedText from '../../components/atoms/text/MutedText';
import Field from '../../components/molecules/form/Field';
import InputMutedText from '../../components/atoms/input/InputMutedText';

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
  },
  nameText: {
    marginTop: 15,
  },
});

const HeaderContainer: React.FC<NativeBase.View> = styled(View)`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const InfoContainer: React.FC<NativeBase.View> = styled(View)`
  width: 90%;
  margin-top: 20px;
  justify-content: center;
`;

const ProfileInfoScreen: NavigationStackScreenComponent<any, any> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { navigation } = props;
  const user: User = useSelector((state: any) => state.auth.user);
  const error = useSelector((state: any) => state.auth.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      ToastService.closeLabelToast(error, () => {
        dispatch(cleanAuthError());
      });
    }
  }, [error]);

  return (
    <Container>
      <Header transparent />
      <Content padder contentContainerStyle={styles.content}>
        <HeaderContainer>
          <CircleImage height={140} width={140} source={{ uri: user.avatar }} />
        </HeaderContainer>

        <InfoContainer>
          <Field
            label="Username"
            defaultValue={user.username}
            dismissLabel
            disabled
          />

          <Field
            label="Name"
            defaultValue={`${user.name} ${user.lastname}`}
            dismissLabel
            disabled
          />

          <Field
            label="Email"
            defaultValue={user.email}
            dismissLabel
            disabled
          />

          <InputMutedText
            defaultValue={user.description}
            placeholder="Description"
            dismissLabel
            fontSize={16}
            disabled
          />
        </InfoContainer>
      </Content>
    </Container>
  );
};

ProfileInfoScreen.navigationOptions = {
  headerTitle: '',
  headerTransparent: true,
  headerBackTitleVisible: false,
  headerTintColor: '#000',
  headerLeftContainerStyle: {
    marginLeft: 10,
  },
};


export default ProfileInfoScreen;
