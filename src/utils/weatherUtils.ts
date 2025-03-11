export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const groupForecastByDay = (forecastList: any[]): any[][] => {
  const days: any[][] = [];
  let currentDay = '';
  let currentDayItems: any[] = [];

  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toDateString();

    if (day !== currentDay) {
      if (currentDayItems.length > 0) {
        days.push(currentDayItems);
      }
      currentDay = day;
      currentDayItems = [item];
    } else {
      currentDayItems.push(item);
    }
  });

  if (currentDayItems.length > 0) {
    days.push(currentDayItems);
  }

  return days.slice(0, 6);
};

export const formatTemperature = (temp: number, unit: 'metric' | 'imperial'): string => {
  const symbol = unit === 'metric' ? '°C' : '°F';
  return `${Math.round(temp)}${symbol}`;
};

export const findForecastForTime = (forecastItems: any[], targetHour: number): any => {
  return forecastItems.reduce((closest, current) => {
    const date = new Date(current.dt * 1000);
    const hourDiff = Math.abs(date.getHours() - targetHour);
    const closestDate = new Date(closest.dt * 1000);
    const closestHourDiff = Math.abs(closestDate.getHours() - targetHour);

    return hourDiff < closestHourDiff ? current : closest;
  }, forecastItems[0]);
};
