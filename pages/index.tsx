import styled from 'styled-components';
import Fires from '../components/Fires';
import { Fire, loadFires } from '../utils/fires';


const StyledContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;

  @media only screen and (max-width: 600px) {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`

const StyledHeader = styled.h1`
text-align: center;
`

const StyledNoFires = styled.div`
  margin-top: 40vh;
`

const Home: React.FC<{ fires: Fire[] }> = ({ fires }) => {

  if (!fires.length) {
    return (
      <StyledContainer>
        <StyledNoFires>
          <StyledHeader>
            YAY! Colorado is not on fire.
          </StyledHeader>
        </StyledNoFires>
      </StyledContainer>
    );
  }

  return (
    <>
      <StyledContainer>
        <StyledHeader>
          Yes, Colorado is on fire.
        </StyledHeader>
      </StyledContainer>
      <Fires fires={fires} />
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  return {
    props: {
      fires: await loadFires()
    },
  }
}