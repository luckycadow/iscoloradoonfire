import type { Fire } from './fires'

export const ACTIVE_CLASSES = ['outline', 'z-20'] as const

export function focusFire(id: string) {
  const marker = document.getElementById(getMarkerId(id))
  const card = document.getElementById(getCardId(id))
  card && activateCard(card)
  marker && activateMarker(marker)
}

export function getMarkerId(fireId: string) {
  return `fire-marker-${fireId}`
}

export function createMarkerImage(fire: Fire, active = false) {
  const img = new Image(28, 28)
  img.src = '/marker.svg'
  img.dataset.fireId = fire.id
  img.id = getMarkerId(fire.id)
  img.className =
    'map-marker shadow-md outline-8 outline-red-800 rounded-full cursor-pointer'
  img.addEventListener('click', () => focusFire(fire.id))

  if (active) {
    img.classList.add(...ACTIVE_CLASSES)
  }

  return img
}

function activateMarker(el: HTMLElement) {
  const markers = document.querySelectorAll('.map-marker')
  for (let marker of markers) {
    marker.classList.remove(...ACTIVE_CLASSES)
  }
  el.classList.add(...ACTIVE_CLASSES)
}

function activateCard(el: HTMLElement) {
  el.scrollIntoView()
}

function getCardId(fireId: string) {
  return `fire-card-${fireId}`
}
