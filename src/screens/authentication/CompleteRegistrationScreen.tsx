import { NavigationStackScreenComponent } from 'react-navigation-stack';
import React, { useCallback, useEffect, useReducer } from 'react';
import {
  Card, CardItem, Container, Content, Header,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAvoidingView } from 'react-native';
import User from '../../models/User';
import Title from '../../components/atoms/text/Title';
import { cleanAuthError, completeRegistration } from '../../store/modules/Authentication';
import ToastService from '../../services/ToastService';
import Submit from '../../components/atoms/button/Submit';
import FullRegistrationForm from '../../components/organisms/FullRegistrationForm';

type Params = {};
type ScreenProps = {};

interface CompleteRegistrationScreenValue {
  data: User;
  isValid: boolean;
  isLoading: boolean;
}

const UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE';
const UPDATE_LOADING = 'UPDATE_LOADING';

const CompleteRegistrationScreenReducer = (state: any, action: any) => {
  switch (action.type) {
    case UPDATE_INPUT_VALUE:
      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: action.value,
        },
      };
    case UPDATE_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

const CompleteRegistrationScreen: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { navigation } = props;
  const user: User = useSelector((state: any) => state.auth.user);
  const errorMessage: string = useSelector((state: any) => state.auth.error);

  const completeRegistrationScreenValue: CompleteRegistrationScreenValue = {
    data: user,
    isValid: false,
    isLoading: false,
  };

  const [formState, formDispatch] = useReducer(
    CompleteRegistrationScreenReducer,
    completeRegistrationScreenValue,
  );

  const dispatch = useDispatch();

  const onInputChangeHandler = useCallback((id: string, value: string, isValid: boolean) => {
    formDispatch({
      type: UPDATE_INPUT_VALUE,
      id,
      value,
      isValid,
    });
  }, [formDispatch]);

  const onSubmitHandler = useCallback(() => {
    formDispatch({ type: UPDATE_LOADING, isLoading: true });
    dispatch(completeRegistration(formState.data));
  }, [formState, dispatch, formDispatch]);

  useEffect(() => {
    if (errorMessage) {
      formDispatch({ type: UPDATE_LOADING, isLoading: false });
      ToastService.closeLabelToast(errorMessage, () => {
        dispatch(cleanAuthError());
      });
    }
  }, [errorMessage, dispatch, formDispatch]);

  return (
    <Container>
      <Header transparent translucent />
      <Content padder>
        <Card>
          <CardItem header>
            <Title style={{ width: '100%', textAlign: 'center' }}>User info</Title>
          </CardItem>
          <CardItem>
            <Content>
              <FullRegistrationForm user={formState.data} onInputChange={onInputChangeHandler} />
            </Content>
          </CardItem>
          <CardItem footer>
            <KeyboardAvoidingView>
              <Submit label="Complete registration" onSubmit={onSubmitHandler} loading={formState.isLoading} />
            </KeyboardAvoidingView>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

CompleteRegistrationScreen.navigationOptions = {
  headerTitle: '',
  headerShown: false,
};

export default CompleteRegistrationScreen;
