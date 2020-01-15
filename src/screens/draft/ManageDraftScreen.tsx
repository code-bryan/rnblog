import React, { useCallback, useEffect, useReducer } from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import {
  Container, Content, Header, Input, NativeBase, View,
} from 'native-base';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import User from '../../models/User';
import CustomHeaderButton from '../../components/atoms/button/CustomHeaderButton';
import ManageDraftForm from '../../components/organisms/ManageDraftForm';
import Post from '../../models/Post';
import { ActionReducer } from "../../types/ActionReducer";
import { NavigationEvents } from "react-navigation";

interface ReducerValue {
  form: Post,
}

const CHANGE_FORM = 'CHANGE_FORM';
const CLEAN_FORM = 'CLEAN_FORM';

const INITIAL_STATE: ReducerValue = {
  form: new Post(),
};

const FormReducer = (state: ReducerValue, action: Partial<ActionReducer>) => {
  switch (action.type) {
    case CHANGE_FORM:
      return {
        ...state,
        form: action.payload,
      };
    case CLEAN_FORM:
      return action.payload;
    default:
      return state;
  }
};



const ContentStyled: React.FC<NativeBase.Content> = styled(Content)`
  margin-left: 20px;
  margin-right: 20px;
`;

const ManageDraftScreen: NavigationStackScreenComponent = (props) => {
  const user: User = useSelector((state: any) => state.auth.user);
  INITIAL_STATE.form.author = user;
  const [formState, formDispatch] = useReducer(FormReducer, INITIAL_STATE);

  const onChangeHandler = useCallback((updatedPost: Post) => {
    const action: ActionReducer = { type: CHANGE_FORM, payload: updatedPost, };
    formDispatch(action);
  }, [formDispatch]);

  const onWillFocusHandler = useCallback(() => {
    const action: ActionReducer = { type: CLEAN_FORM, payload: INITIAL_STATE, };
    formDispatch(action);
  }, [formDispatch]);

  useEffect(() => {
    console.log(formState);
  }, [formState]);

  return (
    <Container>
      <Header transparent />
      <NavigationEvents onWillFocus={onWillFocusHandler} />
      <ContentStyled>
        <ManageDraftForm newPost={formState.form} onChange={onChangeHandler} />
      </ContentStyled>
    </Container>
  );
};

ManageDraftScreen.navigationOptions = (navData) => ({
  headerTitle: '',
  headerTransparent: true,
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Save"
        iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
        buttonStyle={{ marginRight: 20 }}
        onPress={() => {
          navData.navigation.navigate('AddDraft');
        }}
      />
    </HeaderButtons>
  ),
});

export default ManageDraftScreen;
