import { useState } from 'react';
import styled from 'styled-components'
import Map from './Map';
import { Fire } from '../utils/fires';
import { COLORS } from '../constants/theme';


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
    background: ${COLORS.cardHighlight};
  }
`

const StyledDescription = styled.div`
  padding-top: 0.5rem;
  line-height: 1.5em;
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
            <StyledDescription>{fire.description}</StyledDescription>
          </StyledCard>
        ))}
      </StyledContainer>
    </>
  );
};

export default Fires;
