import React, { useCallback, useState } from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import {
  Container, Content, Header, Text, Card, CardItem, Form, Button, Spinner,
} from 'native-base';
import {
  Alert, Dimensions, KeyboardAvoidingView, ScrollView,
} from 'react-native';
import Title from '../../components/UI/Text/Title';
import Field from '../../components/UI/Form/Field';
import AuthenticationService from '../../services/AuthenticationService';
import ToastService from '../../services/ToastService';

type Params = {};
type ScreenProps = {};

const ForgotPasswordScreen: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const emailFromNavigation = navigation.getParam('email');
  const [email, setEmail] = useState(emailFromNavigation || '');
  const [loading, setLoading] = useState(false);

  const onInputChangeHandler = useCallback((id: string, value: string) => {
    setEmail(value);
  }, [setEmail]);

  const onSubmitHandler = useCallback(async () => {
    try {
      setLoading(true);
      await AuthenticationService.forgotPassword(email);
      setLoading(false);
      const resetPasswordMessage = `
        A mail has been sent to your email inbox, follow the steps and then try login again.
      `;
      Alert.alert('Reset password', resetPasswordMessage, [
        {
          text: 'Ok',
          style: 'default',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (e) {
      setLoading(false);
      ToastService.closeLabelToast(e.message);
    }
  }, [email, setLoading, navigation]);

  return (
    <Container>
      <ScrollView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <Header transparent translucent />
          <Content padder style={{ paddingTop: Dimensions.get('window').height / 8 }}>
            <Card>
              <CardItem header>
                <Title style={{ width: '100%', textAlign: 'center' }}>Forgot password</Title>
              </CardItem>
              <CardItem>
                <Content>
                  <Form>
                    <Field
                      id="email"
                      label="Email"
                      email
                      autoCapitalize="none"
                      defaultValue={email}
                      onChange={onInputChangeHandler}
                    />
                  </Form>
                </Content>
              </CardItem>
              <CardItem footer>
                <Button
                  rounded
                  style={{ marginHorizontal: 50, marginBottom: 10 }}
                  onPress={onSubmitHandler}
                >
                  {loading && (<Spinner style={{ width: '100%' }} color="white" size="small" />)}
                  {!loading && (
                    <Text style={{ textAlign: 'center', width: '100%' }}>
                      Reset password
                    </Text>
                  )}
                </Button>
              </CardItem>
            </Card>
          </Content>
        </KeyboardAvoidingView>
      </ScrollView>
    </Container>
  );
};

ForgotPasswordScreen.navigationOptions = {
  headerTransparent: true,
  headerTitle: '',
};

export default ForgotPasswordScreen;
