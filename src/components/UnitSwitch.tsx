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
  color: #757575;
`;

const SwitchContainer = styled.div`
  display: flex;
  background-color: #f1f1f1;
  border-radius: 20px;
  overflow: hidden;
`;

const UnitButton = styled.button<{
  active: boolean;
}>`
  padding: 5px 15px;
  background-color: ${({ active }) => (active ? '#2196F3' : 'rgb(213, 208, 208)')};
  color: ${({ active }) => (active ? 'white' : '#333333')};
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: ${({ active }) => (active ? 'default' : 'pointer')};
`;

export default UnitSwitch;
