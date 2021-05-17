import React, { ReactElement } from 'react';
import { View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

import { PlaceholderImage } from '~/assets/images';

import {
  Container,
  HeaderContainer,
  HeaderProfileImage,
  NameContainer,
  Username,
  ProfileText,
  MenuContainer,
  MenuButton,
  MenuTitle,
} from './styles';

import { useAuth } from '../../hooks/auth';

interface CustomDrawerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any;
}

function CustomDrawer({ navigation }: CustomDrawerProps): ReactElement {
  const { user } = useAuth();

  async function handleSignOut(): Promise<void> {
    navigation.closeDrawer();
    // signOut();
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <Container>
        <HeaderContainer>
          <View>
            <HeaderProfileImage
              source={
                !user?.image_url ? PlaceholderImage : { uri: user?.image_url }
              }
            />
            <MaterialIcons
              style={{ position: 'absolute', right: 150 }}
              name="mode-edit"
              size={24}
              color="white"
            />
          </View>
          <NameContainer>
            <Username>{user?.name}</Username>
          </NameContainer>
          <NameContainer>
            <ProfileText>{user?.email}</ProfileText>
          </NameContainer>
        </HeaderContainer>

        <MenuContainer>
          <MenuButton onPress={() => null}>
            <MenuTitle>Histórico de Corridas</MenuTitle>
          </MenuButton>
          <MenuButton onPress={() => null}>
            <MenuTitle>Pagamento</MenuTitle>
          </MenuButton>
          <MenuButton onPress={() => null}>
            <MenuTitle>Código Promocional</MenuTitle>
          </MenuButton>
          <MenuButton onPress={handleSignOut}>
            <MenuTitle>Sair</MenuTitle>
          </MenuButton>
        </MenuContainer>
      </Container>
    </ScrollView>
  );
}

export default CustomDrawer;
