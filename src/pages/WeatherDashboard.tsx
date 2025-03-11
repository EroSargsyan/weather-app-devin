import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchWeatherByCity, fetchWeatherByCoords, toggleUnit } from '../store/weatherSlice';

import LoadingSpinner from '../components/LoadingSpinner';
import ErrorModal from '../components/ErrorModal';
import SearchBar from '../components/SearchBar';
import UnitSwitch from '../components/UnitSwitch';

const WeatherDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentWeather, forecast, selectedDay, isLoading, error, unit, city } = useAppSelector(
    (state) => state.weather,
  );

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(
            fetchWeatherByCoords({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            }),
          );
        },
        (error) => {
          console.error('Error getting location:', error);
          dispatch(fetchWeatherByCity('Yerevan'));
        },
      );
    } else {
      dispatch(fetchWeatherByCity('Yerevan'));
    }
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  const handleSearch = (searchCity: string) => {
    dispatch(fetchWeatherByCity(searchCity));
  };

  const handleUnitToggle = () => {
    dispatch(toggleUnit());
    if (city) {
      dispatch(fetchWeatherByCity(city));
    }
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <Container>
      <Header>
        <Title>Weather Forecast</Title>
        <SearchRow>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          <UnitSwitch unit={unit} onToggle={handleUnitToggle} />
        </SearchRow>
      </Header>

      <Content>{isLoading ? <LoadingSpinner /> : <></>}</Content>

      {showError && error && <ErrorModal message={error} onClose={handleCloseError} />}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
  font-weight: 500;
`;

const SearchRow = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Content = styled.main``;

export default WeatherDashboard;
