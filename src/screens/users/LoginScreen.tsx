import React, { useCallback, useReducer } from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import {
  Button, Dimensions, KeyboardAvoidingView, ScrollView, View,
} from 'react-native';
import FormField from '../../components/UI/FormField';
import Content from '../../components/UI/Content';
import Colors from '../../constants/Colors';
import Authentication from '../../models/Authentication';
import Title from '../../components/UI/Title';

type Params = {};
type ScreenProps = {};

const UPDATE_AUTHENTICATION_VALUE = 'UPDATE_AUTHENTICATION_VALUE';

interface LoginScreenReducerValues {
  authentication: Authentication,
  isValid: false
}

const LoginScreenReducer = (state: LoginScreenReducerValues, action: any) => {
  switch (action.type) {
    case UPDATE_AUTHENTICATION_VALUE:
      return {
        ...state,
        authentication: {
          ...state.authentication,
          [action.id]: action.value,
        },
      };
    default:
      return state;
  }
};

const LoginScreen: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const loginScreenReducerValues: LoginScreenReducerValues = {
    authentication: new Authentication(),
    isValid: false,
  };
  const [formState, dispatchForm] = useReducer(LoginScreenReducer, loginScreenReducerValues);

  const onInputChange = useCallback((id: string, value: string, isValid: boolean) => {
    dispatchForm({
      type: UPDATE_AUTHENTICATION_VALUE, id, value, isValid,
    });
  }, [dispatchForm]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Content style={{ marginTop: Dimensions.get('window').height / 5 }}>
          <Title style={{ marginHorizontal: 20, marginBottom: 50 }}>Login</Title>

          <FormField
            id="email"
            type="emailAddress"
            label="Email"
            required
            email
            valid={!!formState.authentication.email}
            defaultValue={formState.authentication.email}
            autoCapitalize="none"
            onChange={onInputChange}
          />

          <FormField
            id="password"
            type="password"
            label="Password"
            valid={!!formState.authentication.password}
            defaultValue={formState.authentication.password}
            required
            minLength={6}
            onChange={onInputChange}
          />

          <View style={{ marginVertical: 20, marginHorizontal: '25%' }}>
            <Button
              title="Log In"
              onPress={() => {
              }}
              color={Colors.primary}
            />
          </View>
        </Content>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

LoginScreen.navigationOptions = (navData) => ({
  headerShown: false,
});

export default LoginScreen;
