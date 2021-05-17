import React, { ReactElement, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import LottieView from 'lottie-react-native';

import { LoadingCar } from '~/assets/loading';
import { Button, Input } from '~/components';
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
  SocialLoginView,
  SocialLoginText,
  Border,
  SocialButtonsView,
} from './styles';

function SignIn(): ReactElement {
  const formRef = useRef<FormHandles>(null);
  const { navigate } = useNavigation();
  const { signIn, loading } = useAuth();

  const handleSubmit = async (data) => {
    signIn(data);
  };

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Header>
          <HeaderText>Entrar</HeaderText>
        </Header>

        <Content>
          <FormBox>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <InputTitle>E-mail:</InputTitle>
              <Input name="email" keyboardType="email-address" />
              <InputTitle>Senha:</InputTitle>
              <Input name="password" secureTextEntry />
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
                Entrar
              </Button>
            )}
            <SocialLoginView>
              <Border />
              <SocialLoginText>Ou entre com</SocialLoginText>
              <Border />
            </SocialLoginView>
            <SocialButtonsView>
              <TouchableOpacity>
                <FontAwesome5 name="facebook" size={42} color="#C4C4C4" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: 20,
                }}
              >
                <FontAwesome5 name="google" size={42} color="#C4C4C4" />
              </TouchableOpacity>
            </SocialButtonsView>
          </FormBox>
        </Content>

        <TouchableOpacity
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            paddingBottom: 20,
            marginTop: 120,
          }}
          onPress={() => navigate('SignUp')}
        >
          <BottomText>Deseja criar uma conta?</BottomText>
          <BottomTextHilight>Cadastre-se aqui.</BottomTextHilight>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Container>
  );
}

export default SignIn;
