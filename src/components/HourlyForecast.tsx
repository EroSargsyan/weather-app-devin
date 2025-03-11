import styled from 'styled-components';
import { IHourlyForecastProps } from '../types/types';
import { formatTemperature, formatTime } from '../utils/weatherUtils';

const HourlyForecast: React.FC<IHourlyForecastProps> = ({ forecastItems, unit }) => {
  if (!forecastItems || !forecastItems?.length) return null;

  const nextHours = forecastItems.slice(0, 8);

  return (
    <Container>
      <Title>Hourly Forecast</Title>
      <ScrollableContainer>
        {nextHours.map((item) => (
          <ForecastItem key={item.dt}>
            <Time>{formatTime(item.dt)}</Time>
            <Temperature>{formatTemperature(item.main.temp, unit)}</Temperature>
            <WeatherIcon
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
            />
          </ForecastItem>
        ))}
      </ScrollableContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  max-width: 750px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 15px;
  font-weight: 500;
`;

const ScrollableContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 15px;
  padding-bottom: 10px;
`;

const ForecastItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 70px;
`;

const Time = styled.span`
  font-size: 14px;
  color: #757575;
  margin-bottom: 5px;
`;

const WeatherIcon = styled.img`
  width: 50px;
  height: 50px;
`;

const Temperature = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

export default HourlyForecast;
