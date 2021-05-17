import React, { ReactElement, ReactNode } from 'react';
import { ViewStyle } from 'react-native';

import { ButtonText, Container } from './styles';

interface ButtonProps {
  children: ReactNode;
  style: ViewStyle;
  onPress(): void;
}

function Button({
  children,
  style,
  onPress,
  ...rest
}: ButtonProps): ReactElement {
  return (
    <Container style={style as unknown} onPress={onPress} {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
}

export default Button;
