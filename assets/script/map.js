let map
const initMap = () => {
  map = new google.maps.Map(document.querySelector('#map'), {
    center: { lat: 59.616621, lng: 16.522310 },
    zoom: 15,
    mapTypeId: 'satellite',
    disableDefaultUI: true
  })

  // Construct the polygon.
  const parking1 = new google.maps.Polygon({
    paths: parking,
    strokeColor: '#18A718',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#23E025',
    fillOpacity: 0.4
  })

  parking1.setMap(map)

  google.maps.event.addListener(parking1, 'click', dockUp)

  google.maps.event.addListener(map, 'click', dockDown)
}

const getCurrentLocation = () => {
  alert('Location not avalible')
}

const dockUp = () => {
  document.querySelector('.dock').classList.add('up')
}

const dockDown = () => {
  document.querySelector('.dock').classList.remove('up')
}

window['initMap'] = initMap
