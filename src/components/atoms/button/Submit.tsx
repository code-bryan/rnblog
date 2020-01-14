import React from 'react';
import {
  Button, NativeBase, Text,
} from 'native-base';
import styled from 'styled-components/native';
import Spinner from '../Spinner';

interface Props {
  label: string;
  onSubmit: () => {};
  loading?: boolean;
  style?: any;
}

const SubmitButtonStyle: React.FC<NativeBase.Button> = styled(Button)`
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 10px;
`;

const CenteredText: React.FC<NativeBase.Text> = styled(Text)`
  text-align: center;
  width: 100%;
`;

const Submit: React.FC<Props> = (props) => {
  const {
    // eslint-disable-next-line react/prop-types
    style, onSubmit, loading, label,
  } = props;

  return (
    <SubmitButtonStyle rounded style={style} onPress={onSubmit}>
      {loading && (
        <Spinner color="white" size="small" />
      )}
      {!loading && (
        <CenteredText style={{ textAlign: 'center', width: '100%' }}>{label}</CenteredText>
      )}
    </SubmitButtonStyle>
  );
};

export default Submit;
