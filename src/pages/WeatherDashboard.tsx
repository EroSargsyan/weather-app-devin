import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchWeatherByCity, fetchWeatherByCoords } from '../store/weatherSlice';
import LoadingSpinner from '../components/LoadingSpinner';

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

  return (
    <Container>
      <Header></Header>

      <Content>{isLoading ? <LoadingSpinner /> : <></>}</Content>

      {showError && error && <></>}
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

const Content = styled.main``;

export default WeatherDashboard;
