import React, { useCallback, useEffect, useReducer } from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import {
  Card, CardItem, Container, Content, Header,
} from 'native-base';
import { Dimensions, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Title from '../../components/atoms/text/Title';
import BasicRegistration from '../../models/BasicRegistration';
import { cleanAuthError, registerAuthUser } from '../../store/modules/Authentication';
import User from '../../models/User';
import Submit from '../../components/atoms/button/Submit';
import ToastService from '../../services/ToastService';
import BasicRegistrationForm from '../../components/organisms/BasicRegistrationForm';

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
  // eslint-disable-next-line react/prop-types
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

  const onInputChangeHandler = useCallback((id: string, value: string, isValid: boolean) => {
    dispatchForm({
      type: UPDATE_INPUT_DATA, id, value, isValid,
    });
  }, [dispatchForm]);

  const verifyPasswordMatch = useCallback(() => {
    const { password, verifyPassword } = formState.data;
    const doesPasswordMatch = password.trim() === verifyPassword.trim();

    if (!doesPasswordMatch) {
      ToastService.closeLabelToast('The password does not match');
    }

    return doesPasswordMatch;
  }, [formState]);

  const onSubmitHandler = useCallback(async () => {
    if (verifyPasswordMatch()) {
      try {
        dispatchForm({ type: UPDATE_LOADING, isLoading: true });
        dispatch(registerAuthUser(formState.data));
      } catch (e) {
        dispatchForm({ type: UPDATE_LOADING, isLoading: false });
        ToastService.closeLabelToast(e.message, () => {
          dispatch(cleanAuthError());
        });
      }
    }
  }, [formState, verifyPasswordMatch, dispatch, dispatchForm]);

  useEffect(() => {
    if (errorMessage) {
      dispatchForm({ type: UPDATE_LOADING, isLoading: false });
      ToastService.closeLabelToast(errorMessage, () => {
        dispatch(cleanAuthError());
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
                <BasicRegistrationForm
                  basicRegistration={formState.data}
                  onInputChange={onInputChangeHandler}
                />
              </Content>
            </CardItem>
            <CardItem footer>
              <Submit label="Submit" loading={formState.isLoading} onSubmit={onSubmitHandler} />
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
