import React from 'react';
import {
  Form, Text, View,
} from 'native-base';
import styled from 'styled-components/native';
import Title from '../atoms/text/Title';
import Field from '../molecules/form/Field';
import Credentials from '../../models/Credentials';
import ForgotPasswordButton from '../atoms/button/ForgotPasswordButton';

interface Props {
  credentials: Credentials,
  onInputChange: Function,
  onForgotPassword: Function
}

const TitleStyled = styled(Title)`
  margin-left: 35px;
  margin-right: 35px;
  margin-bottom: 50px;
`;

const FieldContainer = styled.View`
  margin-left: 30px;
  margin-right: 30px;
`;

const FormLogin: React.FC<Props> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { credentials, onInputChange, onForgotPassword } = props;

  return (
    <Form>
      <TitleStyled>Login</TitleStyled>
      <FieldContainer>
        <Field
          id="email"
          label="Email"
          required
          email
          rounded
          valid={!!credentials.email}
          defaultValue={credentials.email}
          autoCapitalize="none"
          onInputChange={onInputChange}
        />

        <View>
          <Field
            id="password"
            label="Password"
            valid={!!credentials.password}
            defaultValue={credentials.password}
            required
            rounded
            minLength={6}
            autoCapitalize="none"
            secureTextEntry
            last
            onInputChange={onInputChange}
          />
          <ForgotPasswordButton transparent block onPress={onForgotPassword}>
            <Text>Forgot password</Text>
          </ForgotPasswordButton>
        </View>
      </FieldContainer>
    </Form>
  );
};

export default FormLogin;
