import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  height: 60px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fontFamily.interBold};
  font-size: ${({ theme }) => theme.fontSizes.size15};
`;
