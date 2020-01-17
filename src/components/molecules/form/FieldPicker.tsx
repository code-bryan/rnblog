import React from 'react';
import { Icon, NativeBase, Picker } from 'native-base';

const FieldPicker: React.FC<NativeBase.Picker> = (props) => (
  <Picker
    mode="dropdown"
    textStyle={props.textStyle}
    iosIcon={<Icon name="arrow-down" style={{ marginRight: 3 }} fontSize={32} />}
    placeholder={props.placeholder}
    selectedValue={props.selectedValue}
    onValueChange={props.onValueChange}
  >
    {props.children}
  </Picker>
);

export default FieldPicker;
