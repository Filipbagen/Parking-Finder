let map
const parkings = []

const initMap = () => {
  map = new google.maps.Map(document.querySelector('#map'), {
    center: { lat: 59.610862, lng: 16.553854 },
    zoom: 20,
    mapTypeId: 'satellite',
    disableDefaultUI: true
  })

  // Construct the polygon.
  const Master_Ahls_gata_8 = new google.maps.Polygon({
    paths: parking,
    strokeColor: '#18A718',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#23E025',
    fillOpacity: 0.4,
    id: '1',
    weekday: '10:00 - 20:00',
    beforered: '10:00 - 21:00',
    red: 'Stängt',
    place: 'Mäster Ahls gata'
  })

  Master_Ahls_gata_8.setMap(map)
  parkings.push(Master_Ahls_gata_8)

  const ansgars = new google.maps.Polygon({
    paths: ansgarsNorth,
    strokeColor: '#18A718',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#23E025',
    fillOpacity: 0.4,
    id: '2',
    weekday: 'Alltid gratis',
    beforered: 'Alltid gratis',
    red: 'Alltid gratis'
  })

  ansgars.setMap(map)
  parkings.push(ansgars)

  // console.log(parking1.weekday)

  // parkings[parkings.length - 1].addListener('click', function (event) {
  //   console.log(this.id)
  // })
  parkings.forEach(parking => {
    // console.log(parking.id)

    parking.addListener('click', function () {
      dockUp(parking)
    })
  })

  // map.addListener('center_changed', function () {
  //   // 3 seconds after the center of the map has changed, pan back to the
  //   // marker.
  //   window.setTimeout(function () {
  //     map.panTo(ansgars.getPosition())
  //   }, 3000)
  // })

  // ansgars.addListener('click', function () {
  //   map.setZoom(18)
  //   map.setCenter(ansgars.getPosition())
  // })

  // google.maps.event.addListener(parking1, 'click', dockUp)

  google.maps.event.addListener(map, 'click', dockDown)

  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     var pos = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude
  //     }

  //     infoWindow.setPosition(pos)
  //     infoWindow.setContent('Location found.')
  //     infoWindow.open(map)
  //     map.setCenter(pos)
  //   }, function () {
  //     handleLocationError(true, infoWindow, map.getCenter())
  //   })
  // } else {
  //   // Browser doesn't support Geolocation
  //   handleLocationError(false, infoWindow, map.getCenter())
  // }
}

// function handleLocationError (browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos)
//   infoWindow.setContent(browserHasGeolocation
//     ? 'Error: The Geolocation service failed.'
//     : 'Error: Your browser doesn\'t support geolocation.')
//   infoWindow.open(map)
// }

const getCurrentLocation = () => {
  alert('Location not avalible')
}

const dockUp = (parking) => {
  console.log(parking)
  document.querySelector('#weekdays_time').textContent = parking.weekday
  document.querySelector('#beforeRed').textContent = parking.beforered
  document.querySelector('#red_time').textContent = parking.red
  document.querySelector('#place').textContent = parking.place
  document.querySelector('.dock').classList.add('up')

  if (getDayString() >= 1 || getDayString() <= 5) {
    document.querySelector('#today_time').textContent = parking.weekday

  } else if (getDayString() === 5) {
    document.querySelector('#today_time').textContent = parking.beforered

  } else {
    document.querySelector('#today_time').textContent = parking.red
  }

}

const dockDown = () => {
  document.querySelector('.dock').classList.remove('up')
  document.querySelector('#weekdays_time').textContent = '00:00'
  document.querySelector('#today_time').textContent = '00:00'
  document.querySelector('#beforeRed').textContent = '00:00'
  document.querySelector('#red_time').textContent = '00:00'
  document.querySelector('#place').textContent = 'Parking'
}

window['initMap'] = initMap

function getDayString() {
  const today = new Date()
  const dayString = today.getDay()
  return dayString
}

