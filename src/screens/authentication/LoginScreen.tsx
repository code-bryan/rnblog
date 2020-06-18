import React, { useCallback, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import {
  Button, Container, Content, Header, Text, View,
} from 'native-base';
import Credentials from '../../models/Credentials';
import { authenticateUser, cleanAuthError } from '../../store/modules/Authentication';
import User from '../../models/User';
import ToastService from '../../services/ToastService';
import Submit from '../../components/atoms/button/Submit';
import FormLogin from '../../components/organisms/FormLogin';

type Params = {};
type ScreenProps = {};

const UPDATE_AUTHENTICATION_VALUE = 'UPDATE_AUTHENTICATION_VALUE';
const UPDATE_LOADING = 'UPDATE_LOADING';

interface LoginScreenReducerValues {
  credentials: Credentials,
  isValid: boolean,
  loading: boolean
}

const LoginScreenReducer = (state: LoginScreenReducerValues, action: any) => {
  switch (action.type) {
    case UPDATE_AUTHENTICATION_VALUE:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          [action.id]: action.value,
        },
      };
    case UPDATE_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

const loginScreenReducerValues: LoginScreenReducerValues = {
  credentials: new Credentials(),
  isValid: false,
  loading: false,
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
    dispatchForm({ type: UPDATE_LOADING, loading: true });
    await dispatch(authenticateUser(formState.credentials));
  }, [dispatch, formState, errorMessage, dispatchForm]);

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
      dispatchForm({ type: UPDATE_LOADING, loading: false });
      ToastService.closeLabelToast(errorMessage, () => {
        dispatch(cleanAuthError());
      });
    }
  }, [errorMessage, dispatch, dispatchForm]);

  useEffect(() => {
    if (user.uid.length > 0 && !isNewUser) {
      props.navigation.navigate('AuthLoading');
    }
  }, [user, isNewUser]);

  return (
    <Container style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <Header transparent />
          <Content style={{ paddingTop: Dimensions.get('window').height / 7 }}>
            <FormLogin
              credentials={formState.credentials}
              onInputChange={onInputChangeHandler}
              onForgotPassword={onForgotPasswordHandler}
            />

            <View style={{ marginVertical: 20, marginHorizontal: '25%' }}>
              <Submit label="Log In" onSubmit={onSubmitHandler} loading={formState.loading} style={{ width: '100%', alignSelf: 'center' }} />

              <Button transparent onPress={() => props.navigation.navigate('Register')} style={{ marginTop: 20 }}>
                <Text style={{ width: '100%', textAlign: 'center' }}>Sign Up</Text>
              </Button>
            </View>

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
