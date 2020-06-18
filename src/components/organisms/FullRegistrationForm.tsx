import { Form } from 'native-base';
import React from 'react';
import Field from '../molecules/form/Field';
import User from '../../models/User';

interface Props {
  user: User;
  onInputChange: Function;
}

const FullRegistrationForm: React.FC<Props> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { user, onInputChange } = props;

  return (
    <Form>
      <Field
        id="name"
        label="Name"
        required
        defaultValue={user.name}
        onInputChange={onInputChange}
      />

      <Field
        id="lastname"
        label="Lastname"
        required
        defaultValue={user.lastname}
        onInputChange={onInputChange}
      />

      <Field
        id="username"
        label="Username"
        required
        autoCapitalize="none"
        defaultValue={user.username}
        onInputChange={onInputChange}
      />

      <Field
        id="description"
        label="Description"
        numberOfLines={4}
        defaultValue={user.description}
        onInputChange={onInputChange}
      />
    </Form>
  );
};

export default FullRegistrationForm;
