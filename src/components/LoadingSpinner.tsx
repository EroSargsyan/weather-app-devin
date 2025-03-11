import styled, { keyframes } from 'styled-components';

const LoadingSpinner: React.FC = () => {
  return (
    <LoaderContainer>
      <Loader />
      <LoadingText>Loading weather data...</LoadingText>
    </LoaderContainer>
  );
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;

const Loader = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 20px;
`;

const LoadingText = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.lightText};
`;

export default LoadingSpinner;
