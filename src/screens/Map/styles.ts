import MapView from 'react-native-maps';
import styled, { css } from 'styled-components/native';

interface IBottomView {
  expand: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
`;

export const MapStyled = styled(MapView)`
  width: 100%;
  height: 100%;
`;

export const IconButton = styled.TouchableOpacity.attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
})`
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.white};
  position: absolute;
  top: 15px;
  left: 15px;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
`;

export const BottomView = styled.View.attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
})<IBottomView>`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 320px;
  background: ${({ theme }) => theme.colors.white};
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  align-items: center;

  ${(props) =>
    props.expand &&
    css`
      height: 480px;
    `}
`;

export const ButtonDraggable = styled.View`
  width: 50px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.border};
  margin-top: 10px;
`;

export const ContentSearch = styled.View.attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
})<IBottomView>`
  width: 90%;
  height: 70px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  background: ${({ theme }) => theme.colors.white};
  ${(props) =>
    props.expand &&
    css`
      height: 140px;
    `}
`;

export const SearchView = styled.View<IBottomView>`
  width: 100%;
  height: 60px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 15px;
  padding: 8px;
  margin-top: 5px;
  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.expand &&
    css`
      border-radius: 0px;
      border-bottom-width: 0.5px;
      margin: 0;
    `}
`;
export const Input = styled.TextInput`
  flex: 1;
  padding: 0 10px;
  color: ${({ theme }) => theme.colors.grayDark};
  font-size: ${({ theme }) => theme.fontSizes.size16};
  font-family: ${({ theme }) => theme.fontFamily.interRegular};
`;

export const LocationsView = styled.TouchableOpacity`
  width: 90%;

  flex-direction: row;
  justify-content: center;
  padding-bottom: 15px;
  margin-top: 10px;
`;

export const IconBackground = styled.View`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: 25px;
  justify-content: center;
  align-items: center;
`;

export const LocationInfo = styled.View`
  margin-left: 10px;
  flex: 1;
`;

export const LocationAddress = styled.Text`
  color: ${({ theme }) => theme.colors.grayDark};
  font-size: ${({ theme }) => theme.fontSizes.size16};
  font-family: ${({ theme }) => theme.fontFamily.interRegular};
  max-width: 100%;
`;

export const LocationCity = styled.Text`
  color: ${({ theme }) => theme.colors.grayLight};
  font-size: ${({ theme }) => theme.fontSizes.size13};
  font-family: ${({ theme }) => theme.fontFamily.interRegular};
`;

export const ShowMapButton = styled.TouchableOpacity`
  flex-direction: row;
  width: 90%;
  margin: 30px 15px;
`;

export const ShowMapText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.size15};
  font-family: ${({ theme }) => theme.fontFamily.interRegular};
  margin-left: 10px;
`;
