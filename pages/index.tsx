import { useEffect } from 'react'
import styled from 'styled-components'
import Fires from '../components/Fires'
import { COLORS } from '../constants/theme'
import { Fire, loadFires } from '../utils/fires'

const StyledContainer = styled.div<{ $fire: boolean }>`
  color: ${COLORS.text};
  background: ${({ $fire }) =>
    $fire ? COLORS.fireBackground : COLORS.defaultBackground};
  padding-top: 2rem;
  padding-bottom: 2rem;
  min-height: 100%;

  @media only screen and (max-width: 600px) {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
`

const StyledHeader = styled.h1`
  text-align: center;
  padding-bottom: 1rem;
`

const StyledNoFires = styled.div`
  margin-top: 40vh;
`

const Home: React.FC<{ fires: Fire[] }> = ({ fires }) => {
  useEffect(() => {
    if (fires.length) {
      document.body.style.background = COLORS.fireBackground
    }
  }, [fires])

  if (!fires.length) {
    return (
      <StyledContainer>
        <StyledNoFires>
          <StyledHeader>YAY! Colorado is not on fire.</StyledHeader>
        </StyledNoFires>
      </StyledContainer>
    )
  }

  return (
    <StyledContainer $fire>
      <StyledHeader>Yes, Colorado is on fire.</StyledHeader>
      <Fires fires={fires} />
    </StyledContainer>
  )
}

export default Home

export async function getServerSideProps() {
  return {
    props: {
      fires: await loadFires()
    }
  }
}
