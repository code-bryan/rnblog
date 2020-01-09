import React, { useCallback, useReducer } from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import {
  Button, Card, CardItem, Container, Content, Form, Header, Text, Toast,
} from 'native-base';
import { Dimensions, KeyboardAvoidingView } from 'react-native';
import Title from '../../components/UI/Text/Title';
import Field from '../../components/UI/Form/Field';
import BasicRegistration from '../../models/BasicRegistration';
import AuthenticationService from '../../services/AuthenticationService';

type Params = {};
type ScreenProps = {};

const UPDATE_INPUT_DATA = 'UPDATE_INPUT_DATA';

interface RegisterScreenValues {
  data: BasicRegistration,
  isValid: boolean
}

const RegisterScreenReducer = (state: any, action: any) => {
  if (action.type === UPDATE_INPUT_DATA) {
    return {
      ...state,
      data: {
        ...state.data,
        [action.id]: action.value,
      },
    };
  }

  return state;
};

const RegisterScreen: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const registerScreenValues: RegisterScreenValues = {
    data: new BasicRegistration(),
    isValid: false,
  };

  const [formState, dispatchForm] = useReducer(RegisterScreenReducer, registerScreenValues);

  const inputChangeHandler = useCallback((id: string, value: string, isValid: boolean) => {
    dispatchForm({
      type: UPDATE_INPUT_DATA, id, value, isValid,
    });
  }, [dispatchForm]);

  const verifyPasswordMatch = useCallback(() => {
    const { password, verifyPassword } = formState.data;
    const doesPasswordMatch = password.trim() === verifyPassword.trim();

    if (!doesPasswordMatch) {
      Toast.show({
        text: 'The password does not match',
        buttonText: 'Close',
        duration: 3000,
      });
    }

    return doesPasswordMatch;
  }, [formState]);

  const submitHandler = useCallback(async () => {
    if (verifyPasswordMatch()) {
      try {
        await AuthenticationService.registerUser(formState.data);
      } catch (e) {
        Toast.show({
          text: e.message,
          buttonText: 'Close',
          duration: 3000,
        });
      }
    }
  }, [formState, verifyPasswordMatch]);

  return (
    <Container>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Header transparent translucent />
        <Content padder contentContainerStyle={{ paddingTop: Dimensions.get('window').height / 12 }}>
          <Card>
            <CardItem header>
              <Title style={{ width: '100%', textAlign: 'center' }}>Register</Title>
            </CardItem>
            <CardItem>
              <Content>
                <Form>
                  <Field
                    id="email"
                    label="Email"
                    defaultValue={formState.data.email}
                    onChange={inputChangeHandler}
                    autoCapitalize="none"
                    email
                  />

                  <Field
                    id="password"
                    label="Password"
                    defaultValue={formState.data.password}
                    onChange={inputChangeHandler}
                    required
                    minLength={6}
                    secureTextEntry
                  />

                  <Field
                    id="verifyPassword"
                    label="Verify password"
                    defaultValue={formState.data.verifyPassword}
                    onChange={inputChangeHandler}
                    required
                    minLength={6}
                    secureTextEntry
                  />
                </Form>
              </Content>
            </CardItem>
            <CardItem footer>
              <Button
                rounded
                style={{ marginHorizontal: 35, marginBottom: 10 }}
                onPress={submitHandler}
              >
                <Text style={{ textAlign: 'center', width: '100%' }}>Submit</Text>
              </Button>
            </CardItem>
          </Card>

        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
};

RegisterScreen.navigationOptions = {
  title: null,
  headerTransparent: true,
};

export default RegisterScreen;
