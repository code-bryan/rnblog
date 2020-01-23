import React, { useCallback, useEffect, useState } from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import {
  Container, Header, View,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {
  Alert,
  FlatList, Platform, RefreshControl, StyleSheet,
} from 'react-native';
import User from '../../models/User';
import HeaderMenuButton from '../../components/molecules/header/HeaderMenuButton';
import CustomHeaderButton from '../../components/atoms/button/CustomHeaderButton';
import Post from '../../models/Post';
import DraftItems from '../../components/molecules/DraftItems';
import SearchHeader from '../../components/organisms/SearchHeader';
import {
  cleanDraftError, deleteDraft, getAllDrafts, refreshDrafts, selectDraft,
} from '../../store/modules/Drafts';
import NoContentListMessage from '../../components/atoms/NoContentListMessage';
import ToastService from '../../services/ToastService';

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
  },
});

const DraftScreen: NavigationStackScreenComponent = (props) => {
  // eslint-disable-next-line react/prop-types
  const { navigation } = props;
  const user: User = useSelector((state: any) => state.auth.user);
  const drafts: Post[] = useSelector((state: any) => state.drafts.drafts);
  const refreshing: boolean = useSelector((state: any) => state.drafts.refreshing);
  const error: string = useSelector((state: any) => state.drafts.errors);
  const [availableDraft, setDrafts] = useState(drafts);
  const dispatch = useDispatch();

  const onRefresh = useCallback(() => {
    dispatch(refreshDrafts(true));
    dispatch(getAllDrafts(user.uid));
  }, [dispatch, user]);

  const onPostSelected = useCallback((id: string) => {
    const postSelected: Post = drafts.find((post) => post.id === id) as Post;
    dispatch(selectDraft(postSelected));
    navigation.navigate({
      routeName: 'ManageDraft',
      params: {
        edit: true,
      },
    });
  }, [drafts, navigation]);

  const onLongSelectPost = useCallback((id: string) => {
    Alert.alert('Delete draft', 'Are you sure to delete this draft?', [
      {
        text: 'Yes',
        onPress: () => {
          const draft: Post = drafts.find((d) => d.id === id) as Post;
          dispatch(deleteDraft(draft));
        },
      },
      {
        text: 'No',
      },
    ]);
  }, [drafts, dispatch]);

  const onSearchHandler = useCallback((filteredDrafts: Post[]) => {
    setDrafts(filteredDrafts);
  }, [setDrafts]);

  useEffect(() => {
    if (error) {
      ToastService.closeLabelToast(error, () => {
        dispatch(cleanDraftError());
      });
    }

    onRefresh();
  }, [error, dispatch, onRefresh]);

  return (
    <Container>
      <Header transparent />
      <View style={{ flex: 1 }}>
        <SearchHeader items={drafts} onSearch={onSearchHandler}>My Drafts</SearchHeader>

        {drafts.length <= 0 && (
          <NoContentListMessage>You do not have any draft</NoContentListMessage>
        ) }

        <FlatList
          data={availableDraft}
          style={styles.list}
          keyExtractor={(item) => item.id}
          refreshing={refreshing}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={(item) => (
            <DraftItems
              post={item.item}
              onPress={onPostSelected}
              onLongPress={onLongSelectPost}
            />
          )}
        />
      </View>
    </Container>
  );
};

DraftScreen.navigationOptions = (navData) => ({
  headerTitle: '',
  headerTransparent: true,
  headerLeft: () => (
    <HeaderMenuButton navigation={navData.navigation} />
  ),
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Add"
        iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
        buttonStyle={{ marginRight: 20 }}
        onPress={() => {
          navData.navigation.navigate({
            routeName: 'ManageDraft',
            params: {
              edit: false,
            },
          });
        }}
      />
    </HeaderButtons>
  ),
});

export default DraftScreen;
