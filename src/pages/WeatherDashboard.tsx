import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import {
  fetchWeatherByCity,
  fetchWeatherByCoords,
  setSelectedDay,
  toggleUnit,
} from '../store/weatherSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorModal from '../components/ErrorModal';
import SearchBar from '../components/SearchBar';
import UnitSwitch from '../components/UnitSwitch';
import CurrentWeather from '../components/CurrentWeather';
import HourlyForecast from '../components/HourlyForecast';
import { groupForecastByDay } from '../utils/weatherUtils';
import DailyForecast from '../components/DailyForecast';

const WeatherDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentWeather, forecast, selectedDay, isLoading, error, unit, city } = useAppSelector(
    (state) => state.weather,
  );

  const [groupedForecast, setGroupedForecast] = useState<any[][]>([]);
  const [showError, setShowError] = useState(false);

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

  const handleDaySelect = (index: number) => {
    dispatch(setSelectedDay(index));
  };

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
    if (forecast?.list?.length) {
      const grouped = groupForecastByDay(forecast.list);
      setGroupedForecast(grouped);
    }
  }, [forecast]);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  return (
    <Container>
      <Header>
        <Title>Weather Forecast</Title>
        <SearchRow>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          <UnitSwitch unit={unit} onToggle={handleUnitToggle} />
        </SearchRow>
      </Header>

      <main>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {currentWeather ? <CurrentWeather data={currentWeather} unit={unit} /> : null}

            {forecast?.list?.length ? (
              <>
                <HourlyForecast forecastItems={forecast.list} unit={unit} />

                {groupedForecast.length > 0 && (
                  <DailyForecast
                    dailyForecast={groupedForecast}
                    selectedDay={selectedDay}
                    unit={unit}
                    onDaySelect={handleDaySelect}
                  />
                )}
              </>
            ) : null}
          </>
        )}
      </main>
      {showError && error && <ErrorModal onClose={handleCloseError} />}
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
`;

export default WeatherDashboard;
