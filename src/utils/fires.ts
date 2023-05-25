import { convert } from 'html-to-text'

export type Fire = {
  id: string
  title: string
  description: string
  link: string
  latitude: number
  longitude: number
}

type Incident = {
  title: string
  lat_deg: string
  long_deg: string
  field_percent_of_perimeter: string
  type: string
  field_incident_description: string
  field_active: string
  created: string
  changed: string
  id: string
  field_incident_overview: string
  size: string
  lat_min: string
  lat_sec: string
  urlPath: string
  long_min: string
  long_sec: string
  measurement_type: string
  field_title_and_unit: string
}

export const loadFires = async (): Promise<Fire[]> => {
  const res = await fetch('https://inciweb.nwcg.gov/api/map_data')
  const data: Incident[] = await res.json()
  return data.map(parseFire).filter(isInColorado)
}

function parseCoordinates(incident: Incident) {
  const lat =
    parseFloat(incident.lat_deg || '0') +
    parseFloat(incident.lat_min || '0') / 60 +
    parseFloat(incident.lat_sec || '0') / 3600

  const long = -(
    parseFloat(incident.long_deg || '0') +
    parseFloat(incident.long_min || '0') / 60 +
    parseFloat(incident.long_sec || '0') / 3600
  )

  return [lat, long]
}

function isInColorado(fire: Fire): boolean {
  const lat = fire.latitude
  const long = fire.longitude
  // Colorado is a square along these lat/long boundaries
  return lat > 37 && lat < 41 && long < -102.03 && long > -109.03
}

function parseFire(incident: Incident): Fire {
  const [latitude, longitude] = parseCoordinates(incident)
  return {
    id: incident.id,
    title: incident.field_title_and_unit,
    description: convert(
      incident.field_incident_overview || incident.field_incident_description
    ),
    link: `https://inciweb.nwcg.gov/incident-information${incident.urlPath}`,
    latitude,
    longitude
  }
}
