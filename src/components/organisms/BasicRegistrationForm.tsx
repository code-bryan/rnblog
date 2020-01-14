import { Form } from 'native-base';
import React from 'react';
import Field from '../molecules/form/Field';
import BasicRegistration from '../../models/BasicRegistration';

interface Props {
  basicRegistration: BasicRegistration;
  onInputChange: Function;
}

const BasicRegistrationForm: React.FC<Props> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { basicRegistration, onInputChange } = props;

  return (
    <Form>
      <Field
        id="email"
        label="Email"
        defaultValue={basicRegistration.email}
        onInputChange={onInputChange}
        autoCapitalize="none"
        email
      />

      <Field
        id="password"
        label="Password"
        defaultValue={basicRegistration.password}
        onInputChange={onInputChange}
        required
        minLength={6}
        secureTextEntry
      />

      <Field
        id="verifyPassword"
        label="Verify password"
        defaultValue={basicRegistration.verifyPassword}
        onInputChange={onInputChange}
        required
        minLength={6}
        secureTextEntry
      />
    </Form>
  );
};

export default BasicRegistrationForm;
