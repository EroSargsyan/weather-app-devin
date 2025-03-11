import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { GlobalStyles } from './styles/GlobalStyles';
import WeatherDashboard from './pages/WeatherDashboard';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<WeatherDashboard />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
