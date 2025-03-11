import styled from 'styled-components';
import { formatTemperature } from '../utils/weatherUtils';
import { ICurrentWeatherProps } from '../types/types';

const CurrentWeather: React.FC<ICurrentWeatherProps> = ({ data, unit }) => {
  if (!data) return null;

  return (
    <Container>
      <Header>
        <CityName>
          {data.name}, {data.sys.country}
        </CityName>
      </Header>

      <WeatherInfo>
        <Temperature>{formatTemperature(data.main.temp, unit)}</Temperature>
        <WeatherDescription>
          <WeatherIcon
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
            alt={data.weather[0].description}
          />
          <span>{data.weather[0].description}</span>
        </WeatherDescription>
      </WeatherInfo>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  max-width: 350px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const CityName = styled.h1`
  font-size: 24px;
  margin-bottom: 5px;
  font-weight: 500;
`;

const WeatherInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Temperature = styled.div`
  font-size: 48px;
  font-weight: 700;
`;

const WeatherDescription = styled.div`
  display: flex;
  align-items: center;
  text-transform: capitalize;
  font-size: 18px;
`;

const WeatherIcon = styled.img`
  width: 60px;
  height: 60px;
`;

export default CurrentWeather;
