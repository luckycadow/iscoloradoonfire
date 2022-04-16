import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import mapbox from 'mapbox-gl/dist/mapbox-gl.js'
import { Fire } from '../utils/fires'
import { COLORS } from '../constants/theme'

mapbox.accessToken =
  'pk.eyJ1IjoibHVja3ljYWRvdyIsImEiOiJjams2eDJndHAwdXF6M3dwMHl1a2lydnZwIn0._P7S1N2ooWDlN5Ohxz9RgA'

const StyledMapContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  padding-top: 1rem;
`

const StyledMap = styled.div`
  width: 100%;
  height: 40vh;
  color: ${COLORS.darkText};
`

const StyledFade = styled.div`
  height: 3rem;
  background: linear-gradient(${COLORS.fireBackground}, rgba(255, 255, 255, 0));
`

export interface MapProps {
  fires: Fire[]
  selectedFire?: Fire
}

const Map: React.FC<MapProps> = ({ fires, selectedFire }) => {
  const markers = useRef<mapboxgl.Marker[]>([])

  useEffect(() => {
    const map = new mapbox.Map({
      bounds: [
        [-102.03, 37],
        [-109.03, 41]
      ],
      fitBoundsOptions: { padding: 15 },
      container: 'mapbox-map',
      style: 'mapbox://styles/mapbox/streets-v11'
    })

    fires.forEach((fire) => {
      const element = new Image(24, 24)
      element.alt = fire.title
      element.src = '/fire.svg'
      const popup = new mapbox.Popup({
        closeButton: false,
        offset: 15
      }).setHTML(`<h4>${fire.title}</h4>`)
      const marker = new mapbox.Marker({ element })
        .setLngLat([fire.longitude, fire.latitude])
        .setPopup(popup)
        .addTo(map)
      marker.id = fire.id
      markers.current.push(marker)
    })

    return map.remove
  }, [fires])

  useEffect(() => {
    markers.current.forEach((m) => {
      const popup = m.getPopup()
      if (selectedFire?.id === (m as any).id && !popup.isOpen()) {
        m.togglePopup()
      } else if (popup.isOpen()) {
        m.togglePopup()
      }
    })
  }, [selectedFire])

  return (
    <StyledMapContainer>
      <StyledMap id="mapbox-map"></StyledMap>
      <StyledFade />
    </StyledMapContainer>
  )
}

export default Map
