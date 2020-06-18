import React, { useCallback, useState } from 'react';
import { Form } from 'native-base';
import Field from '../molecules/form/Field';
import FieldRadio from '../molecules/form/FieldRadio';
import User from '../../models/User';
import InputMutedText from '../atoms/input/InputMutedText';

interface Props {
  user: User;
  readMode: boolean;
  onInputChange: Function;
}

const ProfileForm: React.FC<Props> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { user, readMode, onInputChange } = props;
  const [privacy, setPrivacy] = useState(user.privacy || false);

  const onInputTextChangeHandler = useCallback((id: string, text: string, isValid: boolean) => {
    onInputChange(id, text, isValid);
  }, [user, onInputChange]);

  const onPrivacyPress = useCallback(() => {
    setPrivacy((currentPrivacy) => !currentPrivacy);
    onInputChange('privacy', !privacy, true);
  }, [user, !privacy, setPrivacy, onInputChange]);

  return (
    <Form>
      <Field
        id="username"
        label="Username"
        required
        valid={!!user.username}
        defaultValue={user.username}
        dismissLabel
        onInputChange={onInputTextChangeHandler}
        disabled={readMode}
      />
      <Field
        id="name"
        label="Name"
        required
        valid={!!user.name}
        defaultValue={user.name}
        dismissLabel
        onInputChange={onInputTextChangeHandler}
        disabled={readMode}
      />
      <Field
        id="lastname"
        label="Lastname"
        required
        valid={!!user.lastname}
        defaultValue={user.lastname}
        dismissLabel
        onInputChange={onInputTextChangeHandler}
        disabled={readMode}
      />
      <Field
        id="email"
        label="Email"
        required
        valid={!!user.email}
        defaultValue={user.email}
        dismissLabel
        onInputChange={onInputTextChangeHandler}
        disabled={readMode}
      />
      <FieldRadio selected={privacy} disabled={readMode} onPress={onPrivacyPress}>
        Privacy
      </FieldRadio>
      <InputMutedText
        id="description"
        defaultValue={user.description}
        placeholder="Description"
        dismissLabel
        fontSize={16}
        disabled={readMode}
        onInputChange={onInputTextChangeHandler}
      />
    </Form>
  );
};

export default ProfileForm;
