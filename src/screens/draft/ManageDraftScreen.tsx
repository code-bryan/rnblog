import React, {
  useCallback, useEffect, useReducer, useState,
} from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import {
  Container, Content, Header, NativeBase,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { NavigationEvents } from 'react-navigation';
import CustomHeaderButton from '../../components/atoms/button/CustomHeaderButton';
import ManageDraftForm from '../../components/organisms/ManageDraftForm';
import Post from '../../models/Post';
import { ActionReducer } from '../../types/ActionReducer';
import ToastService from '../../services/ToastService';
import { editDraft, saveDraft } from '../../store/modules/Drafts';

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
  // eslint-disable-next-line react/prop-types
  const { navigation } = props;
  const [editMode] = useState(navigation.getParam('edit'));
  INITIAL_STATE.form = useSelector((state: any) => state.drafts.selectedDraft);
  INITIAL_STATE.form.author = useSelector((state: any) => state.auth.user);
  const [formState, formDispatch] = useReducer(FormReducer, INITIAL_STATE);
  const dispatch = useDispatch();

  const onChangeHandler = useCallback((updatedPost: Post) => {
    const action: ActionReducer = { type: CHANGE_FORM, payload: updatedPost };
    formDispatch(action);
  }, [formDispatch]);

  const onWillFocusHandler = useCallback(() => {
    const action: ActionReducer = { type: CLEAN_FORM, payload: INITIAL_STATE };
    formDispatch(action);
  }, [formDispatch]);

  const onSaveDraft = useCallback(() => {
    const { form } = formState as ReducerValue;
    let valid = true;

    // eslint-disable-next-line no-useless-escape
    const urlRegex = /^(https:\/\/)?[a-z0-9]+([\-.][a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

    if (form.title.length <= 0) {
      valid = false;
    }

    if (!urlRegex.test(form.image)) {
      valid = false;
    }

    if (form.category.id <= 0) {
      valid = false;
    }

    if (valid) {
      dispatch((editMode) ? editDraft(form) : saveDraft(form));
      navigation.goBack();
    } else {
      ToastService.closeLabelToast('Form invalid you must add the title, image url and category');
    }
  }, [formState, dispatch, editMode]);

  useEffect(() => {
    navigation.setParams({ onSaveDraft });
  }, []);

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
          const onSaveDraft: Function = navData.navigation.getParam('onSaveDraft');
          onSaveDraft();
        }}
      />
    </HeaderButtons>
  ),
});

export default ManageDraftScreen;
