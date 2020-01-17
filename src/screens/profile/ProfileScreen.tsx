import React, {
  useCallback, useEffect, useReducer, useState,
} from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Content, Header, NativeBase, View,
} from 'native-base';
import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationEvents } from 'react-navigation';
import User from '../../models/User';
import HeaderMenuButton from '../../components/molecules/header/HeaderMenuButton';
import CircleImage from '../../components/atoms/images/CircleImage';
import CustomHeaderButton from '../../components/atoms/button/CustomHeaderButton';
import ProfileForm from '../../components/organisms/ProfileForm';
import { ActionReducer } from '../../types/ActionReducer';
import ToastService from '../../services/ToastService';
import { cleanAuthError, updateUserProfile } from '../../store/modules/Authentication';

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
  },
  nameText: {
    marginTop: 15,
  },
});

interface ProfileReducer {
  user: User,
  validity: {
    email: boolean;
    password: boolean;
    username: boolean;
    name: boolean;
    lastname: boolean;
    avatar: boolean;
    description: boolean;
    apiKey: boolean;
    privacy: boolean;
  }
}

const CHANGE_FORM = 'Profile/CHANGE_FORM';
const CHANGE_VALIDITY = 'Profile/CHANGE_VALIDITY';

const Reducer = (state: ProfileReducer, action: ActionReducer) => {
  switch (action.type) {
    case CHANGE_FORM:
      return {
        ...state,
        user: action.payload,
      };
    case CHANGE_VALIDITY:
      return {
        ...state,
        validity: action.payload,
      };
    default: return state;
  }
};

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

const ProfileScreen: NavigationStackScreenComponent<any, any> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { navigation } = props;
  const user: User = useSelector((state: any) => state.auth.user);
  const INITIAL_STATE: ProfileReducer = {
    user: useSelector((state: any) => state.auth.user),
    validity: {
      email: true,
      password: true,
      username: true,
      name: true,
      lastname: true,
      avatar: true,
      description: true,
      apiKey: true,
      privacy: true,
    },
  };
  const error = useSelector((state: any) => state.auth.error);
  const [formState, formDispatch] = useReducer(Reducer, INITIAL_STATE);
  const [readMode, setReadMode] = useState(true);
  const dispatch = useDispatch();

  const onResetForm = useCallback(() => {
    setReadMode(true);
    formDispatch({ type: CHANGE_FORM, payload: user });
  }, [dispatch, setReadMode, user]);

  const onInputChangeHandler = useCallback((id: string, text: string | boolean, isValid: true) => {
    formState.user[id] = text;
    formState.validity[id] = isValid;
    formDispatch({ type: CHANGE_FORM, payload: formState.user });
    formDispatch({ type: CHANGE_VALIDITY, payload: formState.validity });
  }, [formState, formDispatch]);

  const onToggleEditMode = useCallback(() => {
    let isValid = true;

    Object.keys(formState.validity).forEach((item) => {
      isValid = isValid && formState.validity[item];
    });

    if (!isValid) {
      ToastService.closeLabelToast('The form is invalid, check the inputs and try again');
      return;
    }

    dispatch(updateUserProfile(formState.user));
    setReadMode((currentReadMode) => !currentReadMode);
  }, [setReadMode, formState, readMode]);

  useEffect(() => {
    navigation.setParams({
      onToggleEditMode,
      readMode,
    });
  }, [readMode, onToggleEditMode]);

  useEffect(() => {
    if (error) {
      ToastService.closeLabelToast(error, () => {
        dispatch(cleanAuthError());
      });
    }
  }, [error]);

  return (
    <Container>
      <NavigationEvents onDidBlur={onResetForm} />
      <Header transparent />
      <Content padder contentContainerStyle={styles.content}>
        <HeaderContainer>
          <CircleImage height={140} width={140} source={{ uri: formState.user.avatar }} />
        </HeaderContainer>

        <InfoContainer>
          <ProfileForm
            user={formState.user}
            readMode={readMode}
            onInputChange={onInputChangeHandler}
          />
        </InfoContainer>
      </Content>
    </Container>
  );
};

ProfileScreen.navigationOptions = (navData) => ({
  headerTitle: '',
  headerTransparent: true,
  headerLeft: () => (
    <HeaderMenuButton navigation={navData.navigation} />
  ),
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Settings"
        iconName="md-settings"
        buttonStyle={{ marginRight: 20 }}
        onPress={() => {
        }}
      />
      <Item
        title="Save"
        iconName={navData.navigation.getParam('readMode') ? 'md-create' : 'md-checkmark'}
        buttonStyle={{ marginRight: 20 }}
        onPress={() => {
          const onToggleEditMode: Function = navData.navigation.getParam('onToggleEditMode');
          onToggleEditMode();
        }}
      />
    </HeaderButtons>
  ),
});


export default ProfileScreen;
