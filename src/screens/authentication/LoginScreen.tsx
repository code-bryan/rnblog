import React, { useCallback, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import {
  Dimensions, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import {
  Button, Container, Content, Form, Text, View,
} from 'native-base';

import Field from '../../components/UI/Form/Field';
import Credentials from '../../models/Credentials';
import Title from '../../components/UI/Text/Title';
import { authenticateUser } from '../../store/modules/Authentication';
import User from '../../models/User';
import ToastService from '../../services/ToastService';

type Params = {};
type ScreenProps = {};

const UPDATE_AUTHENTICATION_VALUE = 'UPDATE_AUTHENTICATION_VALUE';

interface LoginScreenReducerValues {
  credentials: Credentials,
  isValid: false
}

const LoginScreenReducer = (state: LoginScreenReducerValues, action: any) => {
  if (action.type === UPDATE_AUTHENTICATION_VALUE) {
    return {
      ...state,
      credentials: {
        ...state.credentials,
        [action.id]: action.value,
      },
    };
  }

  return state;
};

const loginScreenReducerValues: LoginScreenReducerValues = {
  credentials: new Credentials(),
  isValid: false,
};

const LoginScreen: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const [formState, dispatchForm] = useReducer(LoginScreenReducer, loginScreenReducerValues);
  const user: User = useSelector((state) => state.auth.user);
  const isNewUser: boolean = useSelector((state) => state.auth.isNewUser);
  const errorMessage = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  const onInputChangeHandler = useCallback((id: string, value: string, isValid: boolean) => {
    dispatchForm({
      type: UPDATE_AUTHENTICATION_VALUE, id, value, isValid,
    });
  }, [dispatchForm]);

  const onSubmitHandler = useCallback(async () => {
    await dispatch(authenticateUser(formState.credentials));
  }, [dispatch, formState, errorMessage]);

  const onForgotPasswordHandler = useCallback(() => {
    props.navigation.navigate({
      routeName: 'ForgotPassword',
      params: {
        email: formState.credentials.email,
      },
    });
  }, [formState]);

  useEffect(() => {
    if (errorMessage) {
      ToastService.closeLabelToast(errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (user.uid.length > 0 && !isNewUser) {
      props.navigation.navigate('AuthLoading');
    }
  }, [user, isNewUser]);

  return (
    <Container style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <Content style={{ paddingTop: Dimensions.get('window').height / 5 }}>
            <Form>
              <Title style={{ marginHorizontal: 35, marginBottom: Platform.OS === 'android' ? 50 : 50 }}>Login</Title>
              <View style={{ marginHorizontal: 30 }}>
                <Field
                  id="email"
                  label="Email"
                  required
                  email
                  rounded
                  valid={!!formState.credentials.email}
                  defaultValue={formState.credentials.email}
                  autoCapitalize="none"
                  onChange={onInputChangeHandler}
                />

                <View>
                  <Field
                    id="password"
                    label="Password"
                    valid={!!formState.credentials.password}
                    defaultValue={formState.credentials.password}
                    required
                    rounded
                    minLength={6}
                    autoCapitalize="none"
                    secureTextEntry
                    last
                    onChange={onInputChangeHandler}
                  />
                  <Button transparent block onPress={onForgotPasswordHandler}>
                    <Text style={{ width: '100%', textAlign: 'right' }}>Forgot password</Text>
                  </Button>
                </View>
              </View>

              <View style={{ marginVertical: 20, marginHorizontal: '25%' }}>
                <Button rounded onPress={onSubmitHandler}>
                  <Text style={{ width: '100%', textAlign: 'center' }}>Log In</Text>
                </Button>

                <Button transparent onPress={() => props.navigation.navigate('Register')} style={{ marginTop: 20 }}>
                  <Text style={{ width: '100%', textAlign: 'center' }}>Sign Up</Text>
                </Button>
              </View>
            </Form>

          </Content>
        </KeyboardAvoidingView>
      </ScrollView>
    </Container>
  );
};

LoginScreen.navigationOptions = {
  headerShown: false,
};

export default LoginScreen;
