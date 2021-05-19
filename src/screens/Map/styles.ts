import MapView from 'react-native-maps';
import styled from 'styled-components/native';

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
})`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 320px;
  background: ${({ theme }) => theme.colors.white};
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  align-items: center;
`;

export const ButtonDraggable = styled.View`
  width: 50px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.border};
  margin-top: 10px;
`;

export const SearchView = styled.View.attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
})`
  width: 90%;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 15px;
  padding: 8px;
  margin-top: 10px;
  margin-bottom: 30px;
  flex-direction: row;
  align-items: center;
`;
export const Input = styled.TextInput`
  flex: 1;
  padding: 0 10px;
  color: ${({ theme }) => theme.colors.grayDark};
  font-size: ${({ theme }) => theme.fontSizes.size16};
  font-family: ${({ theme }) => theme.fontFamily.interRegular};
`;

export const LocationsView = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  /* padding-bottom: 15px; */
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
