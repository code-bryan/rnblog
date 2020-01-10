import React from 'react';
import { Button, Spinner, Text } from 'native-base';

interface Props {
  label: string;
  onSubmit: () => {};
  loading?: boolean;
}

const Submit: React.FC<Props> = (props) => (
  <Button
    rounded
    style={{ marginHorizontal: 50, marginBottom: 10 }}
    onPress={props.onSubmit}
  >
    {props.loading && (
      <Spinner style={{ width: '100%' }} color="white" size="small"/>
    )}
    {!props.loading && (
      <Text style={{ textAlign: 'center', width: '100%' }}>{props.label}</Text>
    )}
  </Button>
);

export default Submit;
