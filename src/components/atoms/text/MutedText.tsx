import styled from 'styled-components/native';
import { NativeBase } from 'native-base';

interface Props extends NativeBase.Text{
  fontSize?: number;
}

const MutedText: React.FC<Props> = styled.Text`
  color: #656565;
  font-size: ${(props: Props) => (props.fontSize ? `${props.fontSize}px` : '16px')};
  margin-bottom: 20px;
`;

export default MutedText;
