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

  const ansgars = new google.maps.Polygon({
    paths: ansgarsNorth,
    strokeColor: '#18A718',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#23E025',
    fillOpacity: 0.4
  })

  map.addListener('center_changed', function () {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
    window.setTimeout(function () {
      map.panTo(ansgars.getPosition());
    }, 3000);
  });

  ansgars.addListener('click', function () {
    map.setZoom(18);
    map.setCenter(ansgars.getPosition());
  });

  ansgars.setMap(map)

  google.maps.event.addListener(parking1, 'click', dockUp)

  google.maps.event.addListener(map, 'click', dockDown)





  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);


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

const today = document.querySelector('#today')
today.textContent = 'test'