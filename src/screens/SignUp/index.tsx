import React, { ReactElement, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import LottieView from 'lottie-react-native';
import * as Yup from 'yup';

import { LogoIcon } from '~/assets/icons';
import { LoadingCar } from '~/assets/loading';
import { Button, Input, MaskedInput } from '~/components';
import { useAuth } from '~/hooks/auth';

import {
  BottomText,
  Container,
  Content,
  FormBox,
  Header,
  HeaderText,
  InputTitle,
  BottomTextHilight,
  LogoImage,
} from './styles';

function SignUp(): ReactElement {
  const formRef = useRef<FormHandles>(null);
  const { navigate } = useNavigation();
  const { loading, signUp } = useAuth();

  const handleSubmit = async (data) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        username: Yup.string().required('Username obrigatório'),
        phone: Yup.string().required('Telefone obrigatório'),
        email: Yup.string().required('E-mail obrigatório'),
        password: Yup.string().required('Senha obrigatória'),
        passwordConfirmation: Yup.string().required(
          'Confirmar senha obrigatória',
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signUp(data);
      navigate('SignIn');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Header>
          <HeaderText>Cadastrar-se</HeaderText>
        </Header>

        <Content>
          <LogoImage source={LogoIcon} />

          <FormBox>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <InputTitle>Nome:</InputTitle>
              <Input name="name" />
              <InputTitle>Username:</InputTitle>
              <Input name="username" />
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
              <Input name="passwordConfirmation" secureTextEntry />
            </Form>
            {loading ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LottieView
                  style={{
                    width: 100,
                  }}
                  source={LoadingCar}
                  autoPlay
                  loop
                />
              </View>
            ) : (
              <Button
                style={{ marginVertical: 25 }}
                onPress={() => formRef.current.submitForm()}
              >
                Cadastrar-se
              </Button>
            )}
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
