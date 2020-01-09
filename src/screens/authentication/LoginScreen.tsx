import React, { useCallback, useReducer } from 'react';
import { useDispatch } from 'react-redux';
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

const LoginScreen: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const loginScreenReducerValues: LoginScreenReducerValues = {
    credentials: new Credentials(),
    isValid: false,
  };
  const [formState, dispatchForm] = useReducer(LoginScreenReducer, loginScreenReducerValues);
  const dispatch = useDispatch();

  const onInputChangeHandler = useCallback((id: string, value: string, isValid: boolean) => {
    dispatchForm({
      type: UPDATE_AUTHENTICATION_VALUE, id, value, isValid,
    });
  }, [dispatchForm]);

  const onSubmitHandler = useCallback(() => {
    dispatch(authenticateUser(formState.credentials));
    props.navigation.navigate('AuthLoading');
  }, [dispatch, formState]);

  return (
    <Container style={{ flex: 1 }}>
      <ScrollView>
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
                  valid={!!formState.credentials.email}
                  defaultValue={formState.credentials.email}
                  autoCapitalize="none"
                  onChange={onInputChangeHandler}
                />

                <Field
                  id="password"
                  label="Password"
                  valid={!!formState.credentials.password}
                  defaultValue={formState.credentials.password}
                  required
                  minLength={6}
                  autoCapitalize="none"
                  secureTextEntry
                  onChange={onInputChangeHandler}
                />
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
