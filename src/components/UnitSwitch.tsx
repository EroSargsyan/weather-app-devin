import styled from 'styled-components';
import { IUnitSwitchProps } from '../types/types';

const UnitSwitch: React.FC<IUnitSwitchProps> = ({ unit, onToggle }) => {
  return (
    <Container>
      <Label>Temperature Unit:</Label>
      <SwitchContainer>
        <UnitButton active={unit === 'metric'} onClick={unit === 'imperial' ? onToggle : undefined}>
          °C
        </UnitButton>
        <UnitButton active={unit === 'imperial'} onClick={unit === 'metric' ? onToggle : undefined}>
          °F
        </UnitButton>
      </SwitchContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const Label = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.lightText};
`;

const SwitchContainer = styled.div`
  display: flex;
  background-color: #f1f1f1;
  border-radius: 20px;
  overflow: hidden;
`;

interface UnitButtonProps {
  active: boolean;
}

const UnitButton = styled.button<UnitButtonProps>`
  padding: 5px 15px;
  background-color: ${({ active, theme }) => (active ? theme.colors.primary : 'transparent')};
  color: ${({ active }) => (active ? 'white' : '#333333')};
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: ${({ active }) => (active ? 'default' : 'pointer')};
  transition: ${({ theme }) => theme.transition};

  &:hover:not(:disabled) {
    background-color: ${({ active, theme }) => (active ? theme.colors.primary : '#e0e0e0')};
  }
`;

export default UnitSwitch;
