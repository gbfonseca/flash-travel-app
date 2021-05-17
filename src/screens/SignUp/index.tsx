import React, { ReactElement, useRef } from 'react';
import { KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import { Button, Input, MaskedInput } from '~/components';

import {
  BottomText,
  Container,
  Content,
  FormBox,
  Header,
  HeaderText,
  InputTitle,
  BottomTextHilight,
} from './styles';

function SignUp(): ReactElement {
  const formRef = useRef<FormHandles>(null);
  const { navigate } = useNavigation();

  const handleSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Header>
          <HeaderText>Cadastro </HeaderText>
        </Header>

        <Content>
          <FormBox>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <InputTitle>Nome:</InputTitle>
              <Input name="name" />
              <InputTitle>Telefone:</InputTitle>
              <MaskedInput
                name="phone"
                type="cel-phone"
                options={{ format: '(00) 00000-0000' }}
              />
              <InputTitle>E-mail:</InputTitle>
              <Input name="email" keyboardType="email-address" />
              <InputTitle>Senha:</InputTitle>
              <Input name="password" secureTextEntry />
              <InputTitle>Confirmar Senha:</InputTitle>
              <Input name="passwordConfirm" secureTextEntry />
            </Form>
            <Button
              style={{ marginVertical: 25 }}
              onPress={() => formRef.current.submitForm()}
            >
              Cadastrar-se
            </Button>
          </FormBox>
        </Content>

        <TouchableOpacity
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            paddingBottom: 20,
          }}
          onPress={() => navigate('SignIn')}
        >
          <BottomText>Já tem uma conta ?</BottomText>
          <BottomTextHilight>Entre aqui.</BottomTextHilight>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Container>
  );
}

export default SignUp;
