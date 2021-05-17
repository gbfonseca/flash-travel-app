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

export const Content = styled.View`
  flex: 1;
  padding-top: 70px;
  align-items: center;
  justify-content: center;
`;

export const FormBox = styled.View`
  flex: 1;
  max-width: 320px;
`;

export const InputTitle = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.interBold};
  font-size: ${({ theme }) => theme.fontSizes.size15};
  color: ${({ theme }) => theme.colors.gray};
`;

export const SocialLoginView = styled.View`
  margin-top: 30px;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const Border = styled.View`
  flex: 1;
  border-color: ${({ theme }) => theme.colors.border};
  border-width: 1px;
`;

export const SocialLoginText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.interMedium};
  font-size: ${({ theme }) => theme.fontSizes.size15};
  color: ${({ theme }) => theme.colors.blackLight};
  text-transform: uppercase;
  padding: 0 10px;
`;

export const SocialButtonsView = styled.View`
  margin-top: 30px;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
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
