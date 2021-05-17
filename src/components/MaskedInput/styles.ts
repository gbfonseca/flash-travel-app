import styled, { css } from 'styled-components/native';

interface IContainerProps {
  isFocused: boolean;
  isErrored: boolean;
  isDisabled: boolean;
}

export const Container = styled.View<IContainerProps>`
  width: 100%;
  height: 45px;
  background: ${({ theme }) => theme.colors.grayLight};
  margin: 10px 0;
  flex-direction: row;
  align-items: center;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  ${(props) =>
    props.isFocused &&
    css`
      border-color: ${({ theme }) => theme.colors.primary};
    `}
  ${(props) =>
    props.isErrored &&
    css`
      border-color: ${({ theme }) => theme.colors.red};
    `}
  ${(props) =>
    props.isDisabled &&
    css`
      background-color: ${({ theme }) => theme.colors.grayLight};
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: ${({ theme }) => theme.colors.grayDark};
  font-size: ${({ theme }) => theme.fontSizes.size16};
  padding: 0 16px;
  font-family: ${({ theme }) => theme.fontFamily.interRegular};
`;
