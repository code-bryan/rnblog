import { NativeBase, Spinner as SpinnerToStyle } from 'native-base';
import styled from 'styled-components/native';
import React from 'react';

const Spinner: React.FC<NativeBase.Spinner> = styled(SpinnerToStyle)`
  width: 100%;
`;

export default Spinner;
