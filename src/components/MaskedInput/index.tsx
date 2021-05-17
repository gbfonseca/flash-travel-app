import React, { useState, useCallback, useRef, useEffect } from 'react';
import { TextInputProps, TextStyle } from 'react-native';

import { useField } from '@unform/core';
import {
  TextInputMask,
  TextInputMaskTypeProp,
  TextInputMaskOptionProp,
} from 'react-native-masked-text';

import { Container, TextInput } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  type: TextInputMaskTypeProp;
  initialValue?: string;
  options?: TextInputMaskOptionProp;
  placeholderTextColor?: string;
  style?: TextStyle;
  height?: string | number;
  width?: string | number;
  onChangeValue?: any;
}

interface InputValueReference {
  value: string;
}

const InputMask: React.FC<InputProps> = ({
  name,
  type,
  initialValue,
  options,
  placeholderTextColor,
  height,
  width,
  onChangeValue,
  ...rest
}) => {
  const inputElementRef = useRef(null);
  const { registerField, fieldName, defaultValue = '', error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        inputValueRef.current.value = value;
        // inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [registerField, fieldName]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  const [value, setValue] = useState(initialValue);
  const [rawValue, setRawValue] = useState('');

  const handleOnChangeText = useCallback(
    (maskedValue, unmaskedValue) => {
      setValue(maskedValue);
      setRawValue(unmaskedValue);
      if (onChangeValue) {
        onChangeValue(unmaskedValue);
      }
      inputValueRef.current.value = unmaskedValue;
    },
    [onChangeValue],
  );

  return (
    <Container
      isFocused={isFocused}
      isErrored={!!error}
      style={{ height: height ?? 45, width: width ?? '100%' }}
    >
      <TextInputMask
        type={type}
        includeRawValueInChangeText
        value={value}
        options={options}
        onChangeText={handleOnChangeText}
        customTextInput={TextInput}
        customTextInputProps={{
          rawValue,
          ...rest,
        }}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholderTextColor={placeholderTextColor ?? '#515151'}
        {...rest}
      />
    </Container>
  );
};

export default InputMask;
