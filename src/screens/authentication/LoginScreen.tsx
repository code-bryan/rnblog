import React, { useCallback, useReducer } from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import {
  Button, Dimensions, KeyboardAvoidingView, ScrollView, View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import FormField from '../../components/UI/Form/Field';
import Container from '../../components/UI/Container';
import Colors from '../../constants/Colors';
import Credentials from '../../models/Credentials';
import Title from '../../components/UI/Text/Title';
import { authenticateUser } from '../../store/modules/Authentication';
import Link from '../../components/UI/Text/Link';

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

  const onInputChange = useCallback((id: string, value: string, isValid: boolean) => {
    dispatchForm({
      type: UPDATE_AUTHENTICATION_VALUE, id, value, isValid,
    });
  }, [dispatchForm]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Container style={{ marginTop: Dimensions.get('window').height / 5 }}>
          <Title style={{ marginHorizontal: 20, marginBottom: 50 }}>Login</Title>

          <FormField
            id="email"
            type="emailAddress"
            label="Email"
            required
            email
            valid={!!formState.credentials.email}
            defaultValue={formState.credentials.email}
            autoCapitalize="none"
            onChange={onInputChange}
          />

          <FormField
            id="password"
            type="password"
            label="Password"
            valid={!!formState.credentials.password}
            defaultValue={formState.credentials.password}
            required
            minLength={6}
            onChange={onInputChange}
          />

          <View style={{ marginVertical: 20, marginHorizontal: '25%' }}>
            <Button
              title="Log In"
              onPress={() => {
                dispatch(authenticateUser(formState.credentials));
                props.navigation.navigate('AuthLoading');
              }}
              color={Colors.primary}
            />

            <Link onPress={() => props.navigation.navigate('Register')} style={{ marginTop: 20 }}>
              Sign Up
            </Link>
          </View>


        </Container>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

LoginScreen.navigationOptions = (navData) => ({
  headerShown: false,
});

export default LoginScreen;
