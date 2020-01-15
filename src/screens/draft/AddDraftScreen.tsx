import React from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import {
  Container, Content, Header, Text, View,
} from 'native-base';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Platform } from 'react-native';
import User from '../../models/User';
import CustomHeaderButton from '../../components/atoms/button/CustomHeaderButton';

const AddDraftScreen: NavigationStackScreenComponent = (props) => {
  const user: User = useSelector((state: any) => state.auth.user);

  return (
    <Container>
      <Header transparent />
      <Content>
        <View>
          <Text>Hi</Text>
        </View>
      </Content>
    </Container>
  );
};

AddDraftScreen.navigationOptions = (navData) => ({
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

export default AddDraftScreen;
