import React, { useCallback } from 'react';
import { NativeBase, View } from 'native-base';
import styled from 'styled-components/native';
import Title from '../atoms/text/Title';
import MutedText from '../atoms/text/MutedText';

interface Props {
  body: string[];
}

const Container: React.FC<NativeBase.View> = styled(View)`
  margin-top: 20px;
`;

const TextContainer: React.FC<Props> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { body } = props;

  const onMapperHandler = useCallback((item) => {
    const [type, body] = item.split('||');

    if (type === 'title') {
      return <Title fontSize={17}>{body}</Title>;
    }
    return <MutedText>{body}</MutedText>;
  }, [body]);

  return (
    <Container>
      {body.map(onMapperHandler)}
    </Container>
  );
};

export default TextContainer;
