import styled from 'styled-components';
import { IErrorModalProps } from '../types/types';

const ErrorModal: React.FC<IErrorModalProps> = ({ onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <ModalContent>
        <Title>Error</Title>
        <Message>City not found</Message>
        <Button onClick={onClose}>Close</Button>
      </ModalContent>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  max-width: 90%;
  width: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
  color: #f44336;
`;

const Message = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 1.5;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #1976d2;
  }
`;

export default ErrorModal;
