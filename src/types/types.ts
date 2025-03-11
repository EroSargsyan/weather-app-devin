export interface IWeatherData {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
}

export interface IForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  pop: number;
  dt_txt: string;
}

export interface IForecastData {
  list: IForecastItem[];
  city: {
    id: number;
    name: string;
    country: string;
  };
}

export interface IWeatherState {
  currentWeather: IWeatherData | null;
  forecast: IForecastData | null;
  selectedDay: number;
  isLoading: boolean;
  error: string | null;
  unit: 'metric' | 'imperial';
  city: string;
}

export interface IErrorModalProps {
  onClose: () => void;
}

export interface ISearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export interface IUnitSwitchProps {
  unit: 'metric' | 'imperial';
  onToggle: () => void;
}

export interface ICurrentWeatherProps {
  data: IWeatherData;
  unit: 'metric' | 'imperial';
}

export interface IHourlyForecastProps {
  forecastItems: IForecastItem[];
  unit: 'metric' | 'imperial';
}

export interface IDailyForecastProps {
  dailyForecast: IForecastItem[][];
  selectedDay: number;
  unit: 'metric' | 'imperial';
  onDaySelect: (index: number) => void;
}
