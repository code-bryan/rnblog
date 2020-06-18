import React from 'react';
import { NativeBase } from 'native-base';
import styled from 'styled-components/native';

interface ContainerProps extends Partial<NativeBase.View> {
  height?: number ;
  width?: number;
  shadow?: boolean;
}

interface Props extends Partial<NativeBase.Image>{
  height?: number;
  width?: number;
  shadow?: boolean;
}

const ItemImageContainer: React.FC<ContainerProps> = styled.View`
  box-shadow: 0 1px 2px #ccc;
  height: ${(props: ContainerProps) => (props.height ? `${props.height}px` : '180px')};
  width: ${(props: ContainerProps) => (props.width ? `${props.width}px` : '180px')};
`;

const ItemImageView: React.FC<NativeBase.Image> = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${(props) => (props.width ? `${props.width}px` : '180px')};
`;

const CircleImage: React.FC<Props> = (props) => (
  <ItemImageContainer height={props.height} width={props.width} shadow={props.shadow}>
    <ItemImageView source={props.source} width={props.width} />
  </ItemImageContainer>
);


export default CircleImage;
