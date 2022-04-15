import { useState } from 'react';
import styled from 'styled-components'
import Map from './Map';
import { Fire } from '../utils/fires';


const StyledContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`

const StyledCard = styled.div`
  padding: 1rem;
  margin: 0 1rem 1rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;

  // This prevents the layout from breaking when someone at a fire department rolls thier face on the keyboard
  * {
    overflow: hidden;
  }

  &:hover {
    background: #f5f5f5;
  }
`

export interface FiresProps {
  fires: Fire[];
}

const Fires: React.FC<FiresProps> = ({ fires }) => {
  const [selectedFire, setSelectedFire] = useState<Fire | null>();

  return (
    <>
      <Map fires={fires} selectedFire={selectedFire} />
      <StyledContainer>
        {fires.map((fire) => (
          <StyledCard
            key={fire.link}
            onMouseOver={() => setSelectedFire(fire)}
            onMouseOut={() => setSelectedFire(null)}
          >
            <h2>{fire.title}</h2>
            <small>{`${fire.latitude.toFixed(2)}, ${fire.longitude.toFixed(2)}`}</small>
            <p>{fire.description}</p>            
          </StyledCard>
        ))}
      </StyledContainer>
    </>
  );
};

export default Fires;
