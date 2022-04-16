import { useEffect } from 'react'
import styled from 'styled-components'
import Fires from '../components/Fires'
import { COLORS } from '../constants/theme'
import { Fire, loadFires } from '../utils/fires'

const StyledContainer = styled.div<{ $fire: boolean; $bg: string }>`
  color: ${COLORS.text};
  background: ${({ $bg }) => $bg};
  padding-top: ${({ $fire }) => ($fire ? '2rem' : '40vh')};
  padding-bottom: 2rem;
  min-height: 100%;
`

const StyledHeader = styled.h1`
  text-align: center;
  padding: 1rem;
`

const Home: React.FC<{ fires: Fire[] }> = ({ fires }) => {
  const onFire = fires.length > 0
  const bg = onFire ? COLORS.fireBackground : COLORS.defaultBackground

  useEffect(() => {
    // This is to properly color the toolbar in Safari
    document.body.style.background = bg
  }, [bg])

  const text = onFire
    ? 'Yes, Colorado is on fire.'
    : 'YAY! Colorado is not on fire.'

  return (
    <StyledContainer $fire={onFire} $bg={bg}>
      <StyledHeader>{text}</StyledHeader>
      {onFire && <Fires fires={fires} />}
    </StyledContainer>
  )
}

export default Home

export async function getServerSideProps() {
  const fires = await loadFires()
  return { props: { fires } }
}
