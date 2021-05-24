import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  align-items: center;
  padding-top: 10px;
`;

export const HeaderText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.interBold};
  font-size: ${({ theme }) => theme.fontSizes.size21};
`;

export const LogoImage = styled.Image`
  width: 220px;
  height: 120px;
`;

export const Content = styled.View`
  flex: 1;
  padding-top: 70px;
  align-items: center;
  justify-content: center;
`;

export const FormBox = styled.View`
  width: 100%;
  max-width: 320px;
`;

export const InputTitle = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.interBold};
  font-size: ${({ theme }) => theme.fontSizes.size15};
  color: ${({ theme }) => theme.colors.gray};
`;

export const BottomText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.interRegular};
  font-size: ${({ theme }) => theme.fontSizes.size15};
  color: ${({ theme }) => theme.colors.grayDark};
`;

export const BottomTextHilight = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.interRegular};
  font-size: ${({ theme }) => theme.fontSizes.size15};
  color: ${({ theme }) => theme.colors.primary};
  margin-left: 5px;
`;
