import { Platform } from 'react-native';

import Constants from 'expo-constants';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  /* justify-content: center;
  align-items: center; */
  background-color: ${({ theme }) => theme.colors.background};
  ${Platform.OS === 'ios'
    ? css`
        padding: ${Constants.statusBarHeight}px 0px;
      `
    : css`
        padding: 0px;
      `}
`;

export const HeaderContainer = styled.View`
  width: 100%;
  padding: 30px 20px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const HeaderProfileImage = styled.Image.attrs({
  resizeMode: 'cover',
})`
  height: 88px;
  width: 88px;
  border-radius: 200px;
`;

export const NameContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

export const Username = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  margin: 10px 0 0;
  font-size: ${({ theme }) => theme.fontSizes.size18};
  font-family: ${({ theme }) => theme.fontFamily.interSemiBold};
`;

export const ProfileText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.size12};
  font-family: ${({ theme }) => theme.fontFamily.interRegular};
`;

export const MenuContainer = styled.View`
  flex: 1;
  padding: 80px 10% 10px 10%;
  flex-direction: column;
  align-items: flex-start;
`;

export const MenuTitle = styled.Text`
  color: ${({ theme }) => theme.colors.grayDark};
  margin-bottom: 35px;
  font-size: ${({ theme }) => theme.fontSizes.size15};
  font-family: ${({ theme }) => theme.fontFamily.interSemiBold};
`;

export const MenuButton = styled.TouchableOpacity``;
