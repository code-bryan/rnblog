import React, { useCallback, useEffect, useReducer } from 'react';
import {
  Icon,
  Input, Item, Label, NativeBase, View,
} from 'native-base';

const INPUT_TOUCHED = 'INPUT_TOUCHED';
const VALUE_CHANGE = 'VALUE_CHANGE';

interface Props extends NativeBase.Input{
  id: string,
  label: string;
  valid?: boolean;
  required?: boolean;
  email?: boolean;
  min?: number;
  max?: number;
  rounded?: boolean;
  last?: boolean;
  minLength?: number;
  onInputChange?: Function;
  dismissLabel?: boolean;
}

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

const Field: React.FC<Props> = (props: Props) => {
  const {
    id,
    label,
    onInputChange,
    defaultValue,
    valid,
    autoCapitalize,
    secureTextEntry,
    rounded,
    numberOfLines,
    last,
    dismissLabel,
    disabled,
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

  useEffect(() => {
    if (state.touched) {
      onInputChange(id, state.value, state.isValid);
    }
  }, [state]);

  return (
    <View style={{ marginBottom: !last ? 20 : 0 }}>
      <Item rounded={rounded} error={!state.isValid && state.touched} style={{ paddingLeft: rounded ? 15 : 0 }}>
        {dismissLabel && (
          <Label style={{ paddingLeft: 5 }}>
            {label}
:
          </Label>
        )}
        <Input
          placeholder={!dismissLabel ? label : ''}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          value={state.value}
          onBlur={onTouchedInput}
          onChangeText={onInputTextChange}
          numberOfLines={numberOfLines}
          style={{ textAlign: dismissLabel ? 'right' : 'left' }}
          disabled={disabled}
        />

        {(!state.isValid && state.touched) && (
          <Icon name="close-circle" />
        )}
      </Item>
    </View>
  );
};

export default Field;
