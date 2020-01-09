import styled from 'styled-components';
import React, { useCallback, useEffect, useReducer } from 'react';
import { Platform, View } from 'react-native';
import TextAlert from './Alert';
import Colors from '../../constants/Colors';

const INPUT_TOUCHED = 'INPUT_TOUCHED';
const VALUE_CHANGE = 'VALUE_CHANGE';

type Props = {
  id: string,
  label: string;
  defaultValue?: string | null;
  valid?: boolean;
  required?: boolean;
  email?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  type: string;
  keyboardType?: string;
  autoCapitalize?: string;
  onChange: Function
};

interface InputReducerValues {
  value: string;
  touched: boolean,
  isValid: boolean
}

const InputReducer = (state: InputReducerValues, action: any) => {
  switch (action.type) {
    case INPUT_TOUCHED:
      return {
        ...state,
        touched: true,
      };
    case VALUE_CHANGE:
      return {
        ...state,
        value: action.data.value,
        isValid: action.data.isValid,
      };
    default:
      return state;
  }
};

const FieldLabel = styled.Text`
   font-size: 20px;
   font-weight: 200;
`;

const FieldContainer = styled.View`
  margin: ${Platform.OS === 'ios' ? '0 15px' : '10px 15px'};
  padding: ${Platform.OS === 'ios' ? '15px 5px' : '0'};
  
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FieldTextInput = styled.TextInput`
  width: 100%;
  font-size: 20px;
  border-bottom-width: ${Platform.OS === 'ios' ? '0.5px' : '0.8px'};
  border-bottom-color: black;
  margin-top: ${Platform.OS === 'ios' ? '10px' : '0'};
`;

const FormField: React.FC<Props> = (props: Props) => {
  const {
    id, label, type, keyboardType, onChange, defaultValue, valid, autoCapitalize,
  } = props;

  const inputReducerValues: InputReducerValues = {
    value: defaultValue || '',
    touched: false,
    isValid: valid || false,
  };

  const [state, dispatch] = useReducer(InputReducer, inputReducerValues);

  const onTouchedInput = useCallback(() => {
    dispatch({ type: INPUT_TOUCHED });
  }, [dispatch]);

  useEffect(() => {
    if (state.touched) {
      onChange(id, state.value, state.isValid);
    }
  }, [state, onChange]);

  const onInputTextChange = useCallback((text: string) => {
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;

    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    if (props.required && text.trim().length <= 0) {
      isValid = false;
    }

    dispatch({
      type: VALUE_CHANGE,
      data: {
        isValid,
        value: text,
      },
    });
  }, [id, dispatch]);

  return (
    <FieldContainer>
      <FieldLabel>{label}</FieldLabel>
      <FieldTextInput
        autoCapitalize={autoCapitalize}
        secureTextEntry={type === 'password'}
        textContentType={type}
        keyboardType={keyboardType}
        value={state.value}
        onBlur={onTouchedInput}
        onChangeText={onInputTextChange}
      />
      {!state.isValid && state.touched && (
        <TextAlert>This input is not valid</TextAlert>
      )}
    </FieldContainer>
  );
};

export default FormField;
