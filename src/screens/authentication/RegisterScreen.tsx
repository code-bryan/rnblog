import React, { useCallback, useEffect, useReducer } from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import {
  Button, Card, CardItem, Container, Content, Form, Header, Spinner, Text, Toast,
} from 'native-base';
import { Dimensions, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Title from '../../components/UI/Text/Title';
import Field from '../../components/UI/Form/Field';
import BasicRegistration from '../../models/BasicRegistration';
import { cleanAuthError, registerAuthUser } from '../../store/modules/Authentication';
import User from '../../models/User';

type Params = {};
type ScreenProps = {};

const UPDATE_INPUT_DATA = 'UPDATE_INPUT_DATA';
const UPDATE_LOADING = 'UPDATE_LOADING';

interface RegisterScreenValues {
  data: BasicRegistration,
  isValid: boolean,
  isLoading: boolean,
}

const RegisterScreenReducer = (state: any, action: any) => {
  switch (action.type) {
    case UPDATE_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case UPDATE_INPUT_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: action.value,
        },
      };
    default:
      return state;
  }
};

const RegisterScreen: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;

  const registerScreenValues: RegisterScreenValues = {
    data: new BasicRegistration(),
    isValid: false,
    isLoading: false,
  };

  const [formState, dispatchForm] = useReducer(RegisterScreenReducer, registerScreenValues);
  const user: User = useSelector((state: any) => state.auth.user);
  const errorMessage = useSelector((state: any) => state.auth.error);
  const dispatch = useDispatch();

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
        dispatchForm({ type: UPDATE_LOADING, isLoading: true });
        dispatch(registerAuthUser(formState.data));
      } catch (e) {
        dispatchForm({ type: UPDATE_LOADING, isLoading: false });
        Toast.show({
          text: e.message,
          buttonText: 'Close',
          duration: 3000,
          onClose: () => {
            dispatch(cleanAuthError());
          },
        });
      }
    }
  }, [formState, verifyPasswordMatch, dispatch, dispatchForm]);

  useEffect(() => {
    if (errorMessage) {
      dispatchForm({ type: UPDATE_LOADING, isLoading: false });
      Toast.show({
        text: errorMessage,
        buttonText: 'Close',
        duration: 3000,
        onClose: () => {
          dispatch(cleanAuthError());
        },
      });
    }
  }, [errorMessage, dispatch]);

  useEffect(() => {
    if (user.uid.length > 0) {
      navigation.navigate('CompleteRegistration');
    }
  }, [user, navigation]);

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
                style={{ marginHorizontal: 50, marginBottom: 10 }}
                onPress={submitHandler}
              >
                { formState.isLoading && (<Spinner style={{ width: '100%' }} color="white" size="small" />) }
                { !formState.isLoading && (
                  <Text style={{ textAlign: 'center', width: '100%' }}>
                    Submit
                  </Text>
                ) }
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
