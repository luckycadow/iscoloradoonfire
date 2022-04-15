import styled from 'styled-components'
import { COLORS } from '../constants/theme'

export const Fade = styled.div`
  height: 3rem;
  background: linear-gradient(${COLORS.fireBackground}, rgba(255, 255, 255, 0));
`
