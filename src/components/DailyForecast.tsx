import styled from 'styled-components';
import { formatDate, formatTemperature, findForecastForTime } from '../utils/weatherUtils';
import { IDailyForecastProps } from '../types/types';

const DailyForecast: React.FC<IDailyForecastProps> = ({
  dailyForecast,
  selectedDay,
  unit,
  onDaySelect,
}) => {
  if (!dailyForecast?.length) return null;

  const now = new Date();
  const currentHour = now.getHours();

  return (
    <Container>
      <Title>5-Day Forecast</Title>
      <DaySelector>
        {dailyForecast.map((day, index) => {
          const isToday = index === 0;

          return (
            <DayTab
              key={day[0].dt}
              selected={index === selectedDay}
              onClick={() => onDaySelect(index)}
            >
              {isToday ? 'Today' : formatDate(day[0].dt)}
            </DayTab>
          );
        })}
      </DaySelector>

      {dailyForecast[selectedDay] ? (
        <div>
          {selectedDay === 0 ? (
            <ForecastItems>
              <ForecastItem key={dailyForecast[selectedDay][0].dt}>
                <Time>{formatDate(dailyForecast[selectedDay][0].dt)}</Time>
                <WeatherContainer>
                  <WeatherIcon
                    src={`https://openweathermap.org/img/wn/${dailyForecast[selectedDay][0].weather[0].icon}.png`}
                    alt={dailyForecast[selectedDay][0].weather[0].description}
                  />
                  <Description>{dailyForecast[selectedDay][0].weather[0].description}</Description>
                </WeatherContainer>
                <TemperatureContainer>
                  <Temperature>
                    {formatTemperature(dailyForecast[selectedDay][0].main.temp, unit)}
                  </Temperature>
                </TemperatureContainer>
              </ForecastItem>
            </ForecastItems>
          ) : (
            <ForecastItems>
              {(() => {
                const forecastItem = findForecastForTime(dailyForecast[selectedDay], currentHour);
                return (
                  <ForecastItem key={forecastItem.dt}>
                    <Time>{formatDate(forecastItem.dt)} </Time>
                    <WeatherContainer>
                      <WeatherIcon
                        src={`https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}.png`}
                        alt={forecastItem.weather[0].description}
                      />
                      <Description>{forecastItem.weather[0].description}</Description>
                    </WeatherContainer>
                    <TemperatureContainer>
                      <Temperature>{formatTemperature(forecastItem.main.temp, unit)}</Temperature>
                    </TemperatureContainer>
                  </ForecastItem>
                );
              })()}
            </ForecastItems>
          )}
        </div>
      ) : null}
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

const DaySelector = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 10px;
  margin-bottom: 20px;
`;

const DayTab = styled.div<{
  selected: boolean;
}>`
  padding: 10px 15px;
  border-radius: 8px;
  background-color: ${({ selected }) => (selected ? '#2196F3' : '#f1f1f1')};
  color: ${({ selected }) => (selected ? '#ffffff' : '#333333')};
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  min-width: max-content;
`;

const ForecastItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ForecastItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 8px;
  background-color: #f5f5f5;
  gap: 10px;
  max-width: 300px;
  width: 100%;
`;

const Time = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const WeatherContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const WeatherIcon = styled.img`
  width: 50px;
  height: 50px;
`;

const Description = styled.div`
  text-transform: capitalize;
  font-size: 14px;
`;

const TemperatureContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Temperature = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

export default DailyForecast;
