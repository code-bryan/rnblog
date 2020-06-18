import React from 'react';
import { NativeBase } from 'native-base';
import styled from 'styled-components/native';

interface ContainerProps extends Partial<NativeBase.View> {
  height?: number ;
}

interface Props extends Partial<NativeBase.Image>{
  height?: number;
}

const ItemImageContainer: React.FC<ContainerProps> = styled.View`
  box-shadow: 0 3px 2px #ccc;
  height: ${(props: ContainerProps) => (props.height ? props.height : '180px')};
`;

const ItemImageView: React.FC<NativeBase.Image> = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const ItemImage: React.FC<Props> = (props) => (
  <ItemImageContainer height={props.height}>
    <ItemImageView source={props.source} />
  </ItemImageContainer>
);


export default ItemImage;
